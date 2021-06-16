# movie-flex

벤처경영학과 웹 프로그래밍 기말 과제입니다

## how to init this project?

1. 해당 프로젝트를 zip이나 git clone합니다.

2. 의존성을 설치합니다.

```javascript
npm init
// or
yarn
```

3. 프로젝트를 구동합니다.

```javascript
npm start
// or
yarn start
```

위 명령어를 터미널 창에 입력하고 잠시 기다리면 자동으로 http://localhost:3000에 리액트 프로젝트가 실행됩니다.

## 그래서 저는 무슨 일을 해야하나요?

1.  /src/components/quiz 폴더에 들어가면 여러분들을 위한 여러 폴더를 만들어 놓았습니다. 거기 안에서 작업하시면 됩니다.
    .gitkeep은 제가 폴더링을 위해서 만들어 놓은 것이니 그냥 두시고 작업하시면 됩니다.

```
1. 초성 퀴즈 => InitialQuiz
2. 영화 관객수 비교하기(이상형 월드컵처럼..) => movieScoreQuiz
3. 영화 이어말하기 => movieNameRelayQuiz
4. 영화 감독으로 문제 => directorQuiz
5. 배우 출연작 => actorQuiz
6. 영화 개봉 순서 => movieYearQuiz
7. 랜덤(섞어서)(랭킹전) => 별도 처리. HOC 거쳐서 뿌리면 될 듯
```

2. **자신의 파일 바깥을 조작하시면 안됩니다.**
   외부 파일을 임포트하여 사용하는 것은 마음대로 하셔도 되지만 외부 폴더에 자신 멋대로 파일, 폴더를 생성하는 것은 금지합니다.
   (단, 필요하다고 판단되는 경우 편하게 카톡 날려주시기 바랍니다.)

3. none

## etc

외부 라이브러리 사용은 마음대로 설치하셔도 됩니다. 다만 무절제하게 사용하는 것은 금지합니다.
무절제하게 사용한다는 것은, 스스로 작성할 수 있음에도 외부 라이브러리를 사용하여 번들의 크기를 키우는 것입니다.  
트리쉐이킹 등 다양한 기법에도 불구하고, 외부 라이브러리는 웹 앱의 크기를 키워서 좋지 않은 영향을 줍니다.

## 활용한 api

https://developers.naver.com/docs/search/movie/
