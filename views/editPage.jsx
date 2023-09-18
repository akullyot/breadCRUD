const React = require('react')
const Default = require('./layouts/Default')

function generateEditPage ({bread, defaultData}) {
    return (
      <Default defaultData = {defaultData}>
        <h2>Edit a bread</h2>
        <form action={`/breads/${bread.id}?_method=PUT`} method="POST">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            defaultValue={bread.name}
            required
          />
          <label htmlFor="image">Image</label>
          <input
            type="text"
            name="image"
            defaultValue={bread.image}
            id="image"/>
          <label htmlFor="hasGluten">Has Gluten?</label>
          <input
            type="checkbox"
            name="hasGluten"
            id="hasGluten"
            defaultChecked = {bread.hasGluten}
          />
          <label htmlFor='baker'> Baker </label>
          <select name = 'baker' id = 'baker' defaultValue={bread.baker}>
            <option value = "Rachel"> Rachel </option>
            <option value = "Monica"> Monica </option>
            <option value = "Joey"> Joey </option>
            <option value = "Chandler"> Chandler </option>
            <option value = "Ross"> Ross </option>
            <option value = "Phoebe"> Phoebe </option>
          </select>
          <br />
          <input type="submit"/>
        </form>
      </Default>
    )
}

module.exports = generateEditPage
