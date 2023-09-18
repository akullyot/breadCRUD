const React = require('react')
const Default = require('./layouts/Default')

function Index ({breadsData, defaultData}) {
    return (
      <Default defaultData = {defaultData}>
        {/* This is a JSX comment */}
        <h2>Index Page</h2>
        <ul>
            {
                breadsData.map((bread) =>
                {
                    return(
                    <li key = {bread.id}>
                        <a href ={`/breads/${bread.id}`}>
                            {bread.name}
                        </a>
                        <p>{bread.getBakedBy()}</p>  
                    </li>)
                })
            }
        </ul>
        <div className="newButton">
            <a href="/breads/new"><button>Add a new bread</button></a>
        </div>
      </Default>
    )
}

module.exports = Index
