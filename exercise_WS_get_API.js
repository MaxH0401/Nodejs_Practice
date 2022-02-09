import fetch from 'node-fetch';
import "dotenv/config";
// console.log(process.env);

// 常數
const repos = [{
    owner: 'MaxH0401',
    repo: 'WS_CallAPI',
},
{
    owner: 'MaxH0401',
    repo: 'WS_CallAPI2',
}];

// PATCH name to AAAA
const getReposAPI = async (owner, repo) => {

    // console.log('owner', owner);
    // console.log('repo', repo);

    const clientIdAndSecret = process.env.DB_KEY;
    const base64 = (text) => Buffer
        .from(text)
        .toString('base64');

    return fetch(`https://api.github.com/repos/${owner}/${repo}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/vnd.github.v3+json',
            'Accept-Language': 'en_US',
            Accept: 'application/json',
            Authorization: `Basic ${base64(clientIdAndSecret)}`,
        },
    });
};

//取得Repo API 轉為json
const getRepos = async () => {
    const promises = [...repos].map(async (repos) => {

        const userDetails = await getReposAPI(repos.owner, repos.repo);
        return userDetails.json();

    });

    const results = await Promise.all(promises);

    return results;
};

//執行
(async () => {
    const result = await getRepos();
    console.log('repo =', result);
})();
