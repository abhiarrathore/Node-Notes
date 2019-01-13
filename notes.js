// node mudule for working with file system
var fs=require('fs');

// fetch notes from file
var fetchNotes=function(){
	try{
		var string=fs.readFileSync('notes-data.json');
		return JSON.parse(string);
	}
	catch(e){
		return [];
	}

}

// save note to file
var saveNotes=function(notes){
	fs.writeFileSync('notes-data.json',JSON.stringify(notes));
}

//add note function
var addNote=function(title,body){
	var notes=fetchNotes();
	var note={
		title,
		body
	}

	var x=0;
	var l=notes.length;
	console.log('the value of length is ',l);
	for(var i=0;i<l;i++)
	{
		if(notes[i].title==title)
		{
			x=x+1;
		}
	}
	if(x==0)
	{
		notes.push(note);
		saveNotes(notes);
		return 'notes saved successfully';
	}
	else{
		return 'title already exist , cannot add note';
	}	
}

var  list=function(){
	return fetchNotes();
}

var read=function(title){
	var notes=fetchNotes();
	var newNote=notes.filter((nodesCheck)=>nodesCheck.title==title);
	return newNote;
}

var  remove=function(title){
	var notes=fetchNotes();
	var newNote=notes.filter((nodesCheck)=>nodesCheck.title!=title);
	var msg=saveNotes(newNote);
	console.log('in the end');
}

module.exports={
	addNote,
	list,
	read,
	remove
}