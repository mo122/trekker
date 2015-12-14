Trekker.factory('Const', Const);

Const.$inject = [];

function Const() {
  var Const = this;

  Const.GH_API = 'https://api.github.com';
  Const.GH_API_URI = URI('https://api.github.com');
  Const.GITHUB_CLIENT_ID = 'e2ac323921a88812d17a';

  return Const;
}