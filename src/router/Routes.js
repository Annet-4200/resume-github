import { Route, Routes as BaseRoutes } from "react-router-dom";
import { Home } from '../pages/Home';
import { Profile } from '../pages/profile/Profile';
///////////////////////////////////////////////////////////////////////////////////////////////////

export default function Routes() {
  return (
    <BaseRoutes>
      <Route path="/" element={<Home />} />
      <Route path=":username" element={<Profile />} />
    </BaseRoutes>
  );
}
