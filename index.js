const axios = require('axios');

let response = {};

let links = [];
let issues = []

axios.get('https://api.github.com/orgs/boomtownroi').then((res) => {
	const values = Object.values(res.data);
	const keys = Object.values(res.data);
	for (let i = 0; i < keys.length; i++) {
		current = keys[i];
		if (typeof current === 'string') {
			slice = current.slice(0, 11);
			if (slice === 'https://api') {
                if(!current.includes('{')){
                    links.push(current)
                } else {
                    issues.push(current)
                }
                
			}
		}
	}
	return keys;
})
.then((links) => {
    links.forEach((link) => {
        axios.get(link).then((res) => {
           if(res.status === 200){
               console.log(res.data)
           }
        })
        .catch(err => console.log(err))
    })
});

console.log(new Date(1574418372 *1000))
