import { Configuration, OpenAIApi } from 'https://cdn.skypack.dev/openai';

const inputForm = document.querySelector('.input-form');
const inputField = document.querySelector('#input-field');
const resultsDiv = document.querySelector('.results');

const configuration = new Configuration({
    apiKey: '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',
});
const openai = new OpenAIApi(configuration);

const createResultLabel = (content) =>  {
    const label = document.createElement('label');
    label.setAttribute('class', 'result-label');
    label.innerHTML = content;
    resultsDiv.appendChild(label);
}

const createCopyButton = (content) => {
    const button = document.createElement('button');
    button.setAttribute('class', 'copy-btn');
    button.innerHTML = 'Copy';
    button.addEventListener('click', (event) => {
        navigator.clipboard.writeText(content);
    });
    resultsDiv.appendChild(button);
}

const handleSubmit = (event) => {
    event.preventDefault();
    resultsDiv.innerHTML = '<div class="loading"><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div><div class="loading-bar"></div></div>';
    const promptMessage = "너는 이모티콘 검색기야. 사용자가 이모티콘을 묘사하거나 이모티콘 이름을 말하면 아래의 데이터 중에 관련된 이모티콘을 '이모티콘, 이름' 형태로 출력해. 사용자가 여러개의 이모티콘을 입력 요정하면 '/'을 각 결과 사이에 넣어.\nQ: " + inputField.value + ';';
    openai.createCompletion({
        model: "text-davinci-003",
        prompt: promptMessage,
        max_tokens: 256,
        top_p: 1,
        frequency_penalty: 0,
        presence_penalty: 0,
    })
    .then((result)=>{
        const answer = result.data.choices[0].text;
        console.log(answer);
        const splited = answer.substr(4).split('/');
        resultsDiv.innerHTML = '';
        splited.forEach(element => {
            console.log(element);
            createResultLabel(element);
            createCopyButton(element);
            resultsDiv.appendChild(document.createElement('br'));
        });
    });
}

inputForm.addEventListener('submit', handleSubmit);