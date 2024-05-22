import { Component } from "react";

const items = [
  {
    name: "apple",
    category: "fruit"
  },
  {
    name: "Cucumber",
    category: "vegetable"
  },
  {
    name: "Banana",
    category: "fruit"
  },
  {
    name: "Celery",
    category: "vegetable"
  },
  {
    name: "orange",
    category: "fruit"
  },
  {
    name: "sausage",
    category: "meat"
  },
  {
    name: "bacon",
    category: "meat"
  }
];

class DoubleSelect extends Component {
  constructor(props){
    super(props); 
    this.state = {
      category: null,
      name: null,
      categoryList: [],
      nameList: [],
      items: []
    }
  }

  async componentDidMount() {
    try {
      this.setState({ 
        category: items[0].category,
        name: items[0].name,
        categoryList: Array.from(new Set(items.map(item => item.category))),
        nameList: items.map((item) => {if (item.category === items[0].category) return item.name}),
        items: items.map((item) => item)
      });
    } catch (e) {
      alert("Failed to update inventory\n" + e)
    }
  }

  handleCategorySelect = (event) => {
    const selectedCategory = event.target.value;
    const names = this.state.items
      .filter(item => item.category === selectedCategory)
      .map(item => item.name);

    this.setState({
      name: names[0],
      category: selectedCategory,
      nameList: names
    });
  }

  handleItemSelect = (event) => {
    this.setState({
      name: event.target.value,
    });
  }

  render(){
    return (
      <div className="app">
        <h1 className="header">{this.state.name}</h1>
        <div className="category">
          <span>Category</span>
          <select name="ItemCategory" onChange={this.handleCategorySelect}> 
          {
            this.state.categoryList.map((category, index) => {
              return <option key={index} value={category}>{category}</option> 
            })
          }
          </select> 
        </div>
        <div className="item">
          <span>Item</span>
          <select name="ItemName" onChange={this.handleItemSelect}>
          {
            this.state.nameList.map((name, index) => {
              return <option key={index} value={name}>{name}</option> 
            })
          }
          </select>
        </div>
      </div>
    )
  }
}

export default DoubleSelect