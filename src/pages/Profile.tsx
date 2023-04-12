import { useParams, useNavigate } from "react-router";
import { useSearchParams } from "react-router-dom";

export const Profile = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [queryParams] = useSearchParams();
  
  return (
    <div className="profile">
    
    </div>
  );
}
