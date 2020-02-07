var keywords = [
	'help',
	'bachao',
	'danger',
	'madad',
	'musyibat',
	'Utavi'
]

var emotions = [
	{ emotion:'angry', emoji:'😡', name:'angrily'},
	{ emotion:'fearful', emoji:'😨' , name:'fearfully' },
	{ emotion:'happy', emoji:'😄', name:'happily'},
	{ emotion:'calm', emoji:'🙂', name:'calmly'},
]

let total = emotions.length * keywords.length
let sets = [];

if(localStorage.getItem('sets') !== null){
	sets = JSON.parse(localStorage.getItem('sets'))
}
else {
    for(let i=0; i<total; i++){
        sets.push(i)
    }
}
window.currentZ = -1;


window.currentKeywords = [0,0];
window.currentEmotion = ['', ''];

function genRandomValueInRange() {
	console.log(window.currentZ)
	if(window.currentZ !== -1)
		sets.splice(window.currentZ, 1)

	console.log(sets)
	let z = sets.length - 1;
	if( z < 0) {
        for(let i=0; i<total; i++){
            sets.push(i)
        }
        z = sets.length - 1
	}

	z = Math.floor((Math.random() * z));
	window.currentZ = z
	let touse = sets[z]

	// sets.splice(z+1, 1)
	localStorage.setItem('sets', JSON.stringify(sets))

    let x = parseInt(touse/emotions.length)
    let y = parseInt(touse%emotions.length)

	return [x,y]
}


function makeKeywordPattern(callback) {
	let xy = genRandomValueInRange()
	let x = xy[0]
	let y = xy[1]
	window.keyx = x;
	window.emoy = y;
	window.currentKeywords = [keywords[x], emotions[y].emotion]
	window.currentEmotion = [emotions[y].name, emotions[y].emoji]
	callback([keywords[x], emotions[y].name,emotions[y].emoji])
}
export default makeKeywordPattern;