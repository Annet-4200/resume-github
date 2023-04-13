import { useEffect, useMemo, useState } from 'react';
import { Repository, User } from './types';
///////////////////////////////////////////////////////////////////////////////////////////////////

type UseUserDataOutput = {
  loading: boolean,
  error: string | null,
  joinDate: string | null
  userProfileData: User | null,
  userReposData: Repository[] | null,
}

export const useUserData = (username: string): UseUserDataOutput => {
  const [userProfileData, setUserProfileData] = useState<User | null>(null);
  const [userReposData, setUserReposData] = useState<Repository[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const url = useMemo(() => `https://api.github.com/users/${username}`, [username]);
  const repos_url = useMemo(() => `https://api.github.com/users/${username}/repos`, [username]);
  const joinDate = useMemo(() => {
    return userProfileData && new Date(userProfileData?.created_at).toLocaleDateString();
  }, [userProfileData?.created_at]);
  
  useEffect(() => {
    Promise.all([
      fetch(url)
        .then(res => {
          switch (res.status) {
            case 200:
              return res.json()
            case 404:
              throw new Error('NOT_FOUND')
            default:
              throw new Error('UNHANDLED_ERROR')
          }
        })
        .then(json => setUserProfileData(json)),
      fetch(repos_url).then(res => {
        switch (res.status) {
          case 200:
            return res.json()
          case 404:
            throw new Error('NOT_FOUND')
          default:
            throw new Error('UNHANDLED_STATUS')
        }
      }).then(async json => {
        const result = json
          .sort((a: Repository, b: Repository) => Date.parse(b.updated_at) - Date.parse(a.updated_at))
          .slice(0, 10);
        const resultWithLangs = await Promise.all(result.map(async (repo: Repository) => {
          const languages_url = `https://api.github.com/repos/${username}/${repo.name}/languages`;
          const languages_res = await fetch(languages_url);
          const languages = await languages_res.json();
          
          return Object.assign(repo, {languages});
        }));
        setUserReposData(resultWithLangs);
      })
    ])
      .catch((e: any) => {
        setError(e?.message || 'UNKNOWN_ERROR')
      })
      .finally(() => setLoading(false))
  }, [url, repos_url]);
  
  return {
    error,
    loading,
    joinDate,
    userReposData,
    userProfileData
  }
}
