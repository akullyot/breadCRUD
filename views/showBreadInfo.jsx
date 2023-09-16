const React = require('react')
const Default = require('./layouts/Default')

function Show ({bread, defaultData}) {
  console.log(bread.name)
    return (
        <Default defaultData = {defaultData}>
        <h3>{bread.name}</h3>
        <p>
            and it
            {
            bread.hasGluten
            ? <span> does </span>
            : <span> does NOT </span>
            }
            have gluten.
        </p>
        <img src={bread.image} alt={bread.name} />
        <form action={`/breads/${bread.id}?_method=DELETE`} method="POST">
            <input type='submit' value="DELETE"/>
        </form>
        <a href={`/breads/${bread.id}/edit`}><button>Edit</button></a>
        <li><a href="/breads">Go home</a></li>
        </Default>
    )
}

module.exports = Show
