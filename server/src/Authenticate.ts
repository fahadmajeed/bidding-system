

export class Authenticate {
  private _username: string;
  private _password: string;

  constructor() {
  }

  private _usersList = [
      {
        name: 'fahad',
        password: 'abc123',
        id: 123451
      },
      {
        name: 'ricardo',
        password: 'powell',
        id: 987123
      },
      {
        name: 'james',
        password: 'xyz123',
        id: 101099
      }
    ];

  login({ username, password }): Object {
    if (!username || !password) {

      this._username = '';
      this._password = '';
    } else {
      this._username = username;
      this._password = password;
    }

    const user = this._usersList.find(usr => usr.name === this._username);
    if (user) {
      if (user.password === this._password) {
        return user;
      }
    } else {
      return -1;
    }
  }
  getUserById(id: number) {
    const f = this._usersList.find(usr => usr.id === id);
    return f;
  }

}
