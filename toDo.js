
/**
 * Class representing an item in the toDoList
 */
class ToDoItem {
  
  constructor(title, description, dateCreated, dueDate) {
    this.title = title;
    this.description = description;
    this.dateCreated = dateCreated;
    this.dueDate = dueDate;
    // status is automatically set to 'New'
    this.status = 'New';
  }
}


/**
 * implementation of a simple toDoList, where the title of an item in the list is used as an ID to access that item
 * and manipulate its position in the list, or any internal information (e.g., status), additional functionality 
 * has been added to output the formatted toDoList.
 * Tabs have been avoided, using 2 spaces instead.
 */
class ToDoList {

  // constructor initializes an empty list
  constructor() {
    // internal array of toDoList item
    this.tasks = [];
  }

  // ***** basic methods ***** //
  // public get/set accessors, grouped by name // 

  /**
   * Method to add an item to the ToDoList, status is initialized to 'New',
   * updates to the status are made with markComplete or markInProgress methods
   * @param {string} itemTitle the title of the task
   * @param {string} itemDescription a description of the task
   * @param {string} itemDateCreated the date this item is being added
   * @param {string} itemDueDate the date the item must be completed by
   */
  addItem (itemTitle, itemDescription = '', itemDateCreated = '', itemDueDate = '') {
    const item = new ToDoItem(itemTitle, itemDescription, itemDateCreated, itemDueDate);
    this.tasks.push(item); 
  }
 
  /**
   * Method to remove an item from the ToDoList if it exists
   * @param {string} itemTitle the title of the item being removed, used as an ID
   */
  deleteItem (itemTitle) {
    this.tasks = this.tasks.filter(item => {
      return item.title !== itemTitle; // returns the array of tasks without the item filtered by the given title
    })
  }

  // ***** public methods to update items in the toDoList ***** // 

  /**
   * Method to update the status of a ToDoList item as being 'Finished'
   * @param {string} itemTitle the title of the item being updated, used as an ID
   */
  markComplete (itemTitle) {
    const item = this._findItem(itemTitle);
    item ? item.status = 'Finished' : this._missingItem(itemTitle);
  }

  /**
   * Method to update the status of an item to be 'Working on'
   * @param {string} itemTitle the title of the item being updated, used as an ID
   */
  markInProgress (itemTitle) {
    const item = this._findItem(itemTitle);
    item ? item.status = 'Working on' : this._missingItem(itemTitle);
  }

  /**
   * Method to update the title of an item in the ToDoList
   * @param {string} itemTitle the old title of the item, used as an ID
   * @param {string} newTitle the new title, to replace the old title
   */
  updateTitle (itemTitle, newTitle) {
    const temp = this._findItem(itemTitle);
    if(temp) {
      temp.title = newTitle;
    }
    else {
      this._missingItem(itemTitle);
    }
    
  }

  /**
   * Method to update the description of an item in the ToDoList
   * @param {string} itemTitle the title of the item being updated, used as the ID
   * @param {string} itemDescription the new description that replaces the previous one
   */
  updateDescription (itemTitle, itemDescription) {
    const temp = this._findItem(itemTitle);
    temp.description = itemDescription;
  } 

  /**
   * Method to update the due date of an item
   * @param {string} itemTitle the title of the item being updated, used as an ID
   * @param {string} itemDueDate the updated due date of the item
   */
  updateDueDate (itemTitle, itemDueDate) {
    const temp = this._findItem(itemTitle);
    temp.dueDate = itemDueDate;
  }

  /**
   * Method to update the date created of an item
   * @param {string} itemTitle the title of the item being updated, used as an ID
   * @param {string} itemDateCreated the updated date created of the item
   */
  updateDateCreated (itemTitle, itemDateCreated) {
    const temp = this._findItem(itemTitle);
    temp.dateCreated = itemDateCreated;
  }


  // ***** public methods to reorganize the ordering in the list ****** //


  // method to bring a task up in the toDoList
  // double checks that the item will not be before the array beginning
  bringUp (itemTitle) {
    const temp = this._findItem(itemTitle);

    if(temp) { 
      const index = this.tasks.indexOf(temp);
      this.deleteItem(itemTitle);

      // cannot go past first space in array
      if(index !== 0) { 
        this.tasks.splice(index - 1, 0, temp);
      } 
      else {
        // first possible position is index 0
        this.tasks.splice(0, 0, temp); 
      }
    } 
    else {
      // warns about an incorrect or missing itemTitle
      this._missingItem(itemTitle); 
    }
  }

  // method to bring an item to the very top of the todo list, index 0
  bringToTop (itemTitle) {
    const temp = this._findItem(itemTitle);
    if(temp) {
      // remove item from its old location
      this.deleteItem(itemTitle); 
      // insert item at index 0, delete nothing
      this.tasks.splice(0, 0, temp); 
    } 
    else {
      this._missingItem(itemTitle);
    }
  }

  // method to send an item down on the toDo list
  // double checks that the item will not go beyond array end
  sendDown (itemTitle) {
    const temp = this._findItem(itemTitle);
    if(temp) {
      let index = this.tasks.indexOf(temp);
      this.deleteItem(itemTitle);

      // cannot move beyond end of list
      if(index < this.tasks.length) {
        index = index + 1;
      }
      // move down 1
      this.tasks.splice(index, 0, temp); 
    } 
    else {
      this._missingItem(itemTitle);
    }
  }


  // **** public methods to output information about the entire toDoList ***** //

  /**
   * Method to read the list in a formatted manner, primarily used for testing
   */
  readList () {
    // index
    let i = 1; 
    this.tasks.forEach(task => {
      console.log(`${ i }.`)
      console.log(`  title: ${ task.title }`);
      console.log(`  description: ${ task.description }`);
      console.log(`  date created: ${ task.dateCreated }`);
      console.log(`  due date: ${ task.dueDate }`);
      console.log(`  status: ${ task.status }`);
      // line separation between tasks
      console.log(''); 
      // avoids the use of shorthand ++ as recommended by ES6
      i = i + 1; 
    });
  }

  /**
   * Method to output the number of tasks in the ToDoList
   */
  numTasks () {
    console.log(this.tasks.length);
  }

  // ***** private methods with _ prefix ***** //

  // the underscore in front of the methods indicates private by ES6 convention

  /**
   * Method to scan the internal array of items in the ToDoList
   * and return the item being searched for
   * @param {string} itemTitle the title of the item being searched for, used as the ID
   * @returns {Object} the ToDoItem in the ToDoList if it exists
   */
  _findItem (itemTitle) {
    const result = this.tasks.find(({ title }) => title === itemTitle);
    return result;
  }

  /**
   * Method to output a warning if an item does not exist in the ToDoList
   * but an access attempt was made.
   * @param {string} itemTitle the title of the item that was attempted to be accessed
   */
  _missingItem (itemTitle) {
    console.log(`WARNING: ${ itemTitle } is not an item in the to do list.`);
  }
}


// testing

const myList = new ToDoList();

myList.addItem('finish project', 'completion of the launch tasks', 'oct 22', 'oct 29', 'Working on');
myList.addItem('read book', 'finish reading Piranesi by Susanna Clark', 'Oct 17, 2025', 'NA', 'Finished');
myList.addItem('read novel', 'finish reading something else by Susanna Clark', 'Oct 17, 2025', 'NA', 'Not Started');
myList.addItem('sing song', 'finish reading something else by Susanna Clark', 'Oct 17, 2025', 'NA', 'Finished');

// toDoList.numTasks();
// toDoList.readList();

//toDoList.deleteItem('read book');

myList.bringToTop('read novel');

// toDoList.numTasks();
myList.readList();

myList.sendDown('finish project')

myList.readList();


//toDoList.markComplete('read what');
//toDoList.bringToTop('what?');
//toDoList.readList();
