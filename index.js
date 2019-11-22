const axios = require('axios');

let response = {};

let links = [];
let issues = []

axios.get('https://api.github.com/orgs/boomtownroi').then((res) => {
    if(res.data.created_at < res.data.updated_at){
        console.log(`Updated at is later than created at`)
    } else {
        console.log(`There is a error with the created at and updated at dates`)
    }
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
           } else {
               `The link ${link} returned a status for of ${res.status}`
           }
        })
        .catch(err => console.log(err))
    })
}).then(() => {
    console.log('The following links need more info, see link to decide what param needs passed');
    issues.forEach(link => console.log(link, 'needs a parameter, check the link'))
});

console.log(new Date(1574418372 *1000))
