const React = require('react');

function Default(html) {
  return (
    <html>
    <head>
      <title>{html.defaultData.title || 'BreadCrud'}</title>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css" integrity="sha512-NhSC1YmyruXifcj/KFRWoC561YpHpc5Jtzgvbuzx5VozKpWvQ+4nXhPdFgmx8xqexRcpAglTj9sIBWINXa8x5w==" crossOrigin="anonymous" />
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css" integrity="sha512-EZLkOqwILORob+p0BXZc+Vm3RgJBOe1Iq/0fiI7r/wJgzOFZMlsqTa29UEl6v6U6gsV4uIpsNZoV32YZqrCRCQ==" crossOrigin="anonymous" />
      <link rel = "stylesheet" href = "/topNav.css"/>
      <link rel = "stylesheet" href = "/main.css"/>
      {html.defaultData.pageCSS || ''}
    </head>
    <body>
      <nav id = 'topNav'>
        <div id = "LHS">
          <img id="breadLogo" src = "/assets/breadIcon.png" alt="breadLogo"></img>
          <span> BreadCRUD: A Bakery Site  </span>
        </div>
        <ul>
            <li> <a href = "/breads"> Index of Breads</a></li>
            <li> <a href = "/breads/new"> Bake a Loaf </a> </li>
        </ul>
      </nav>
      <div className="wrapper">
        <header>
        </header>
        <div className="container">
          {html.children}
        </div>
      </div>
    </body>
    </html>
  )
}


module.exports = Default;

