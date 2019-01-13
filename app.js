// third party module for parsing arguments
const yargs=require('yargs');

const notes=require('./notes.js');

var  command=process.argv[2];

var titleOptions={
		describe:'title of note',
		demand:true,
		alias:'t'
	};
var bodyOptions={
		describe:'body of note',
		demand:true,
		alias:'b'
	};

// configuring allowed commands 
// syntax - yargs.command(cmd, describe, options)
const argv=yargs.command('add','add a note',{
	title:titleOptions,
	body:bodyOptions
})
.command('list','provide title of all notes available')
.command('read','get the body of note',{
	title:titleOptions})
.command('remove','remove the note with given title',{
	title:titleOptions
})
.help()
.argv;

console.log(yargs.argv);

if(command==='add')
{
	console.log('adding a note');
	var  title=yargs.argv.title;
	var  body=yargs.argv.body;
	var returnMsg=notes.addNote(title,body);
	console.log(returnMsg);
}
else if(command==='list')
{
	var allNotes=notes.list();
	console.log('printing ' + allNotes.length + ' note(s)');
	allNotes.forEach(function(no){
		console.log('----');
		console.log(no.title);
		console.log(no.body);
	});

}
else if(command==='read')
{
	var not=notes.read(yargs.argv.title);
	if(not.length==0){
		console.log('nothing to read');
	}else
	{
		console.log(not[0].body);
	}
}else if(command==='remove')
{
	notes.remove(yargs.argv.title);
}else{
	console.log('command not recognized');
}
console.log('exiting app');


