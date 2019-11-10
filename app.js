// Storage Controller
const StorageCtrl = (function(){
  
})()


// Item Controller
// Private
const ItemCtrl = (function(){
  // Item Constructor
  const Item = function(id,name,calories){
    this.id = id;
    this.name =name;
    this.calories = calories;
  }

  // Data Structure / State
  const data = {
    items:[
      // {id:0, name:'Steak Dinner', calories:1200},
      // {id:1, name:'Cookie', calories:400},
      // {id:2, name:'Eggs', calories:300},
    ],
    currentItem: null,
    totalCalories:0
  }
  // Public
  return {
    getItems: function(){
      return data.items;
    },
    addItem:function(name,calories){
      let ID;
      
      // Create ID
      if(data.items.length > 0){
        ID = (data.items[data.items.length - 1].id) + 1
      } else {
        ID = 0;
      }
      // Calories to number
     calories = parseInt(calories);

     // Create new item
     newItem = new Item(ID,name,calories);
     // ADD to items array
     data.items.push(newItem);
     
      return newItem
    },

    logData: function(){
      return data;
    }
  }
})()

// UI Controller
const UICtrl = (function(){
  //Private
  //Dom vars UI
  const UISelectors = {
    itemList:'#item-list',
    addBtn:'.add-btn',
    itemNameInput: '#item-name',
    itemCaloriesInput: '#item-calories'
  }

  //Public
  return{
    populateItemList:function(items){
      let html = '';
      items.forEach(function(item){
        html += `<li class="collection-item" id="item-${item.id}">
        <strong>${item.name}: </strong><em>${item.calories} Calories</em>
        <a href="#" class="secondary-content">
          <i class="edit-item fa fa-pencil"></i>
        </a>
      </li>`;
      });

      // Insert list items
      document.querySelector(UISelectors.itemList).innerHTML = html;
    },

    getItemInput:function(){
     
      return {
        name: document.querySelector(UISelectors.itemNameInput).value,
        calories: document.querySelector(UISelectors.itemCaloriesInput).value
      }
    },

    addListItem: function(item){
      //Show the list
      document.querySelector(UISelectors.itemList).style.display = 'block';
      // Create li element
      const li = document.createElement('li');
      // add class
      li.className = 'collection-item';
      // add ID
      li.id = `item-${item.id}`;
      // add HTML
      li.innerHTML = `<strong>${item.name}: </strong><em>${item.calories} Calories</em>
      <a href="#" class="secondary-content">
        <i class="edit-item fa fa-pencil"></i>
      </a>`;
      // Insert item
      document.querySelector(UISelectors.itemList).insertAdjacentElement('beforeend',li);
    },

    clearInput:function(){
      document.querySelector(UISelectors.itemNameInput).value ='';
      document.querySelector(UISelectors.itemCaloriesInput).value ='';
    },

    hideList:function(){
      document.querySelector(UISelectors.itemList).style.display ='none';
    },

    getSelectors:function(){
      return UISelectors;
    }

  }
})()


// App Controller
const App = (function(ItemCtrl, UICtrl){
  //Private
    //Load Event Listeners
    const loadEventListeners = function(){
      //get UI Selectors
      const UISelectors = UICtrl.getSelectors();

      //Add item event
      document.querySelector(UISelectors.addBtn).addEventListener('click',itemAddSubmit);

    }

    //Add Item Submit
    const itemAddSubmit = function(e){
      //Get form input from UI controller
      const input = UICtrl.getItemInput();
      
      // Check for name and colorie input
      if(input.name !== '' && input.calories !==''){
        //Add item
        const newItem = ItemCtrl.addItem(input.name,input.calories);
        // Add item to UI list
        UICtrl.addListItem(newItem);
        // Clear fields
        UICtrl.clearInput();
      }

      e.preventDefault()
    }
  //Init
  //Public
  return {
    init: function(){
      console.log('Initializing App...');
      // Fetch items from data structure;
      const items = ItemCtrl.getItems();
      
      // Check if any items
      if(items.length === 0){
        //HIDE LINE
        UICtrl.hideList();
      } else {  
        // Populate list with items
        UICtrl.populateItemList(items);
      }
      // Load event listeners
      loadEventListeners();
    }
  }
 
})(ItemCtrl,UICtrl);

// Initialize App
App.init();
