const React = require('react')
const Default = require('./layouts/Default')

function Index ({breadsData, bakersData, defaultData}) {
    return (
      <Default defaultData = {defaultData}>
        {/* This is a JSX comment */}
        <h2>Index Page</h2>
        <h3>All Bakers</h3>
        <ul>
            { bakersData.map((baker) =>{
                return(
                    <li key = {baker.id}>
                        <a href = {`/bakers/${baker.id}`}>{baker.name}</a>
                    </li>
                )
            })
            }
               
        </ul>
        <h3> All Breads</h3>
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
