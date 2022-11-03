const routes = {
  login: () => '/api/v1/login',
  getData: () => '/api/v1/data',
  createNewuser: () => '/api/v1/signup',
};

// login : POST { username: 'admin', password: 'admin' }
// getData: //GET TOKEN
// createNewuser: //POST { username: 'newuser', password: '123456' }

export default routes;
