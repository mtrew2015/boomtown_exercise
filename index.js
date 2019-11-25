const axios = require('axios');

let response = {};

let links = [];
let issues = [];
let repoCount = '';

axios
	.get('https://api.github.com/orgs/boomtownroi')
	.then((res) => {
		if (res.data.created_at < res.data.updated_at) {
			console.log(`Updated at is later than created at`);
		} else {
			console.log(`There is a error with the created at and updated at dates`);
		}
		repoCount = res.data.public_repos;
		const keys = Object.values(res.data);
		for (let i = 0; i < keys.length; i++) {
			current = keys[i];
			if (typeof current === 'string') {
				slice = current.slice(0, 11);
				if (slice === 'https://api') {
					if (!current.includes('{')) {
						links.push(current);
					} else {
						issues.push(current);
					}
				}
			}
		}
		return keys;
	})
	.then((links) => {
		links.forEach((link) => {
			axios
				.get(link)
				.then((res) => {
					if (res.status === 200) {
						console.log('good response');
					} else {
						`The link ${link} returned a status for of ${res.status}`;
					}
				})
				.catch((err) => console.log(err));
		});
	})
	.then(() => {
		console.log('The following links need more info, see link to decide what param needs passed');
		issues.forEach((link) => console.log(link, 'needs a parameter, check the link'));
	})
	.then(() => {
		axios.get(('https://api.github.com/orgs/BoomTownROI/repos')).then(res => {
            length = res.data.length;
            if(length === repoCount){
                console.log('Repo Count Matches')
            } else if(repoCount > length){
                console.log(`Repo count may not be able to be validated since github response limits 30 per response`)
            } else{
                console.log(`Something likely went wrong`)
            }
        }).catch(err => console.log(err))});

        

