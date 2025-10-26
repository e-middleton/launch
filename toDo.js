
/* implementation of a simple toDoList, where the title of an item in the list is used as an ID to access that item
and manipulate its position in the list, or any internal information (e.g., status), additional functionality 
has been added to output the formatted toDoList */
let toDoList = {

    // internal array of toDoItems
    tasks: [], 

    // ***** basic methods ***** //

    // method to add an item to the toDoList
    // items are initialized with status : New, updates can be made using markComplete or markInProgress
    addItem (itemTitle, itemDescription, itemDateCreated, itemDueDate) {
        this.tasks.push({title : itemTitle, description: itemDescription, dateCreated: itemDateCreated, dueDate: itemDueDate, status: 'New'}); 
    },

    //method to remove an item from the toDoList if it exists in the list
    deleteItem (itemTitle) {
        this.tasks = this.tasks.filter(item => {
            return item.title != itemTitle; // returns the array of tasks without the item filtered by the given title
        })
    },

    // method to find an item and return it given the items title, used internally
    findItem (itemTitle) {
        const result = this.tasks.find(({ title }) => title === itemTitle);
        return result;
    },

    // method to give a warning if an item does not exist in the todo list
    missingItem (itemTitle) {
        console.log(`WARNING: ${itemTitle} is not an item in the to do list.`);
    },


    // ***** methods to update items in the toDoList ***** // 


    // mark an item in the list as being complete
    markComplete(itemTitle) {
        let item = this.findItem(itemTitle);
        item ? item.status = 'Finished' : this.missingItem(itemTitle);
    },

    // updates an items status to 'Working on'
    markInProgress(itemTitle) {
        let item = this.findItem(itemTitle);
        item ? item.status = 'Working on' : this.missingItem(itemTitle);
    },

    // updates the title of an item
    updateTitle(itemTitle, newTitle) {
        let temp = this.findItem(itemTitle);
        temp.title = newTitle;
    }, 

    // updates the description of an item
    updateDescription(itemTitle, itemDescription) {
        let temp = this.findItem(itemTitle);
        temp.description = itemDescription;
    }, 

    // updates the due date of an item
    updateDueDate(itemTitle, itemDueDate) {
        let temp = this.findItem(itemTitle);
        temp.dueDate = itemDueDate;
    },

    // updates the date created property of an item
    updateDateCreated(itemTitle, itemDateCreated) {
        let temp = this.findItem(itemTitle);
        temp.dateCreated = itemDateCreated;
    },


    // ***** methods to reorganize the ordering in the list ****** //


    // method to bring a task up in the toDoList
    // double checks that the item will not be before the array beginning
    bringUp (itemTitle) {
        const temp = this.findItem(itemTitle);

        if (temp) { 
            const index = this.tasks.indexOf(temp);
            this.deleteItem(itemTitle);

            if(index != 0) { // cannot go past first space in array
                this.tasks.splice(index-1, 0, temp);
            } else {
                this.tasks.splice(0, 0, temp); // otherwise it goes back into the first position
            }
        } else {
            this.missingItem(itemTitle); // warns about an incorrect or missing itemTitle
        }
     
    },

    //method to bring an item to the very top of the todo list, index 0
    bringToTop (itemTitle) {
        const temp = this.findItem(itemTitle);
        if (temp) {
            this.deleteItem(itemTitle); // remove item from its old location
            this.tasks.splice(0, 0, temp); // insert item at index 0, delete nothing
        } else {
            this.missingItem(itemTitle);
        }
        
    },

    // method to send an item down on the toDo list
    // double checks that the item will not go beyond array end
    sendDown (itemTitle) {
        const temp = this.findItem(itemTitle);
        if (temp) {
            let index = this.tasks.indexOf(temp);
            this.deleteItem(itemTitle);

            (index >= this.tasks.length) ? index = index : index += 1; // cannot move beyond end of list
            this.tasks.splice(index, 0, temp); // move down 1
        } else {
            this.missingItem(itemTitle);
        }
    },


    // **** methods to output information about the entire toDoList ***** //

    // method to output the list and read it in a formatted way
    readList () {
        let i = 1; // index
        this.tasks.forEach(task => {
            console.log(`${i}.`)
            console.log(`   title: ${task.title}`);
            console.log(`   description: ${task.description}`);
            console.log(`   date created: ${task.dateCreated}`);
            console.log(`   due date: ${task.dueDate}`);
            console.log(`   status: ${task.status}`);
            console.log(""); // line separation between tasks
            i++;
        });
    },

    // method to output the number of tasks in the list
    numTasks () {
        console.log(this.tasks.length);
    }
};


// testing

toDoList.addItem('finish project', 'completion of the launch tasks', 'oct 22', 'oct 29', 'Working on');
toDoList.addItem('read book', 'finish reading Piranesi by Susanna Clark', 'Oct 17, 2025', 'NA', 'Finished');
toDoList.addItem('read novel', 'finish reading something else by Susanna Clark', 'Oct 17, 2025', 'NA', 'Not Started');
toDoList.addItem('sing song', 'finish reading something else by Susanna Clark', 'Oct 17, 2025', 'NA', 'Finished');

// toDoList.numTasks();
// toDoList.readList();

//toDoList.deleteItem('read book');

toDoList.bringToTop('read novel');

// toDoList.numTasks();
toDoList.readList();

toDoList.sendDown('finish project')

toDoList.readList();


//toDoList.markComplete('read what');
//toDoList.bringToTop('what?');
//toDoList.readList();
