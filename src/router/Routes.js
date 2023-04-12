import { Route, Routes as BaseRoutes } from "react-router-dom";
import { Profile } from '../pages/Profile';
import { Home } from '../pages/Home';


export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path=":userName" element={<Profile />} />
    </BaseRoutes>
  );
}
