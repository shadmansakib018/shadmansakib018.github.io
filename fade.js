let things = document.querySelectorAll(".fade");

const scrollAppear=()=>{
	positions=[];
	things.forEach(thing=>{
	positions.push(thing.getBoundingClientRect().top);
	});
	let screenPosition = window.innerHeight/1.1;

	for(var i=0; i<things.length; i++){
		if(positions[i] < screenPosition){
			things[i].classList.add("fade-out");
		}
		// else{
		// things[i].classList.remove('fade-out');
		// }
	}

}
window.addEventListener('scroll',scrollAppear)