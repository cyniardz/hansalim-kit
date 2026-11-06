# 한살림 임산부꾸러미 — 일체형 모바일 쇼핑몰

한살림 임산부꾸러미(https://mom.hansalim.or.kr/om/pw/pw_main.do)를 요즘 유행하는 일체형 모바일 쇼핑몰로 다시 만든 포트폴리오.

- 배포: https://hansalim-kit.vercel.app (GitHub `main`에 push하면 Vercel이 자동 배포)
- 기술: React + Vite, react-router-dom, localStorage

## 실행
```
npm install
npm run dev
```
`index.html`을 Live Server로 열면 흰 화면이 나온다. 반드시 Vite로 실행한다.

## 구조
- `src/pages/` 서브페이지 11개: `/products`, `/products/:id`, `/guide`, `/recipes`, `/kit`, `/intro`, `/notice`, `/cart`, `/login`, `/join`, `/mypage`
- `src/components/` 홈 섹션(히어로, 타임딜, 요리, 후기, 인스타, 푸터 등)과 헤더·햄버거 메뉴·팝업
- `src/store.jsx` 장바구니·관심상품·최근 본 상품·가짜 로그인·주문 규칙(localStorage)
- `src/data/product.json` 상품·카테고리 데이터
- `public/images/` 실제 사이트 사진
- `vercel.json` 서브페이지 새로고침 404 방지(모든 주소를 index.html로)
- `1920w light.png` 벤치마킹 디자인 시안, `figma-plan-plugin/` 기획서 슬라이드 생성용 Figma 플러그인

## 원칙
- 레이아웃은 벤치마킹 시안을 따르고, 내용·사진은 실제 한살림 사이트 것을 쓴다.
- 실제 사이트에 없는 요소(타임딜 할인, 후기)는 디자인을 유지하고, 푸터에 포트폴리오용 예시임을 밝힌다.
- 로그인은 서버 없는 시연용이다(브라우저에만 저장).

## 남은 작업
- 히어로 슬라이드 3장
- 안내 팝업 3단계
- 타임딜을 일 단위로 표시
- 햄버거 메뉴 초록 디자인 다듬기
- 기획서: Figma 플러그인 실행 확인(아직 실행해 본 적 없음)
