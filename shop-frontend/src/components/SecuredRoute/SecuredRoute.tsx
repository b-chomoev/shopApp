import React from 'react';
import { Navigate } from 'react-router-dom';

interface SecuredRouteProps extends React.PropsWithChildren {
  isAllowed: boolean | null;
}

const SecuredRoute: React.FC<SecuredRouteProps> = ({isAllowed, children}) => {
  if (!isAllowed) {
    return <Navigate  to={'/login'} />
  }

  return children as React.ReactElement;
};

export default SecuredRoute;