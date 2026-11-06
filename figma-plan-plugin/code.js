// 한살림 임산부꾸러미 일체형 웹페이지 기획서 (1920x1080 슬라이드 11장)를 현재 페이지에 그린다.
async function main() {
  const fonts = await figma.listAvailableFontsAsync();
  const byFam = {};
  for (const f of fonts) { const k = f.fontName.family; if (!byFam[k]) byFam[k] = []; byFam[k].push(f.fontName.style); }
  const fam = ['Pretendard', 'Noto Sans KR', 'Spoqa Han Sans Neo', 'Nanum Gothic'].find((f) => byFam[f]) || 'Inter';
  const st = byFam[fam] || ['Regular', 'Bold'];
  const pick = (...c) => c.find((s) => st.includes(s)) || st[0];
  const R = { family: fam, style: pick('Regular', 'Medium') };
  const B = { family: fam, style: pick('Bold', 'SemiBold', 'Semi Bold', 'ExtraBold', 'Extra Bold', 'Medium', 'Regular') };
  await figma.loadFontAsync(R);
  await figma.loadFontAsync(B);
  figma.currentPage.name = '기획서';

  const c = (h) => ({ r: parseInt(h.slice(1, 3), 16) / 255, g: parseInt(h.slice(3, 5), 16) / 255, b: parseInt(h.slice(5, 7), 16) / 255 });
  const solid = (h) => [{ type: 'SOLID', color: c(h) }];
  const GREEN = '#5FAE2A', SOFT = '#F4F9EF', SUB = '#777777';

  const T = (s, size = 24, o = {}) => {
    const t = figma.createText();
    t.fontName = o.bold ? B : R;
    t.characters = s;
    t.fontSize = size;
    t.fills = solid(o.color || '#222222');
    t.lineHeight = { unit: 'PERCENT', value: o.lh || 150 };
    if (o.align) t.textAlignHorizontal = o.align;
    if (o.w) { t.resize(o.w, Math.max(t.height, 1)); t.textAutoResize = 'HEIGHT'; }
    return t;
  };
  const auto = (dir, gap, p) => {
    const f = figma.createFrame();
    f.layoutMode = dir;
    f.primaryAxisSizingMode = 'AUTO';
    f.counterAxisSizingMode = 'AUTO';
    f.itemSpacing = gap;
    f.fills = [];
    Object.assign(f, p || {});
    return f;
  };
  const col = (gap = 0, p) => auto('VERTICAL', gap, p);
  const row = (gap = 0, p) => auto('HORIZONTAL', gap, p);
  // 너비 고정, 높이는 내용에 맞춤
  const fixW = (f, w) => {
    f.resize(w, Math.max(f.height, 1));
    if (f.layoutMode === 'VERTICAL') { f.counterAxisSizingMode = 'FIXED'; f.primaryAxisSizingMode = 'AUTO'; }
    else { f.primaryAxisSizingMode = 'FIXED'; f.counterAxisSizingMode = 'AUTO'; }
    return f;
  };
  const pad = (f, v, h) => Object.assign(f, { paddingTop: v, paddingBottom: v, paddingLeft: h, paddingRight: h });
  const add = (p, ...kids) => { for (const k of kids) p.appendChild(k); return p; };
  const card = (w, bg = SOFT, gap = 12, v = 32) => { const k = col(gap); fixW(k, w); pad(k, v, 32); k.cornerRadius = 16; k.fills = solid(bg); return k; };
  const ph = (w, h, label) => {
    const p = col(8, { primaryAxisAlignItems: 'CENTER', counterAxisAlignItems: 'CENTER', name: '캡처 자리' });
    p.primaryAxisSizingMode = 'FIXED'; p.counterAxisSizingMode = 'FIXED';
    p.resize(w, h); p.fills = solid('#EEEEEE'); p.cornerRadius = 16;
    p.strokes = solid('#BBBBBB'); p.strokeWeight = 2; p.dashPattern = [12, 8];
    p.appendChild(T(label, 22, { color: '#999999', align: 'CENTER' }));
    return p;
  };
  const bullets = (items, w, size = 24) => { const b = col(10); for (const s of items) b.appendChild(T('· ' + s, size, { w, color: '#333333' })); return b; };

  const slides = [];
  const slide = (name, label, title, sub, bg = '#FFFFFF') => {
    const i = slides.length;
    const f = figma.createFrame();
    f.name = String(i + 1).padStart(2, '0') + ' ' + name;
    f.fills = solid(bg);
    f.layoutMode = 'VERTICAL';
    f.primaryAxisSizingMode = 'FIXED';
    f.counterAxisSizingMode = 'FIXED';
    f.resize(1920, 1080);
    Object.assign(f, { paddingTop: 100, paddingBottom: 100, paddingLeft: 120, paddingRight: 120, itemSpacing: 48 });
    f.clipsContent = true;
    f.x = 100 + (i % 4) * 2020;
    f.y = 100 + Math.floor(i / 4) * 1180;
    if (title) {
      const h = col(14);
      add(h, T(label, 24, { bold: true, color: GREEN }), T(title, 56, { bold: true, lh: 130 }));
      if (sub) h.appendChild(T(sub, 26, { color: SUB, w: 1680 }));
      f.appendChild(h);
    }
    slides.push(f);
    return f;
  };
  const errors = [];
  const build = (name, fn) => { try { fn(); } catch (e) { errors.push(name + ': ' + e.message); } };

  // 01 표지
  build('표지', () => {
    const f = slide('표지', '', '', '', GREEN);
    f.primaryAxisAlignItems = 'CENTER';
    f.itemSpacing = 28;
    add(f,
      T('PORTFOLIO PROJECT 04', 28, { bold: true, color: '#DFF2CF' }),
      T('한살림 임산부꾸러미', 104, { bold: true, color: '#FFFFFF', lh: 120 }),
      T('요즘 많이 쓰는 일체형 웹페이지로 다시 만든 친환경 꾸러미 쇼핑몰', 40, { color: '#FFFFFF' }),
      T(' ', 20),
      T('기간  [직접 입력]     |     역할  기획 · 디자인 · 개발 (1인)     |     사용 기술  React · Vite · React Router · Figma', 26, { color: '#FFFFFF' }),
      T('방동훈', 30, { bold: true, color: '#FFFFFF' }),
    );
  });

  // 02 프로젝트 개요
  build('개요', () => {
    const f = slide('프로젝트 개요', '01  OVERVIEW', '프로젝트 개요');
    const r = row(24);
    const left = col(24);
    add(left,
      T('한살림 임산부 친환경농산물 꾸러미의 실제 물품·사진·이용안내 내용을, 요즘 많이 쓰이는 ‘일체형 웹페이지’ 구성으로 다시 만든 프로젝트입니다.', 30, { w: 796, lh: 160 }),
      T('PC에서는 가운데 모바일 화면과 왼쪽 검색 패널을, 모바일에서는 화면 전체를 쓰는 하나의 페이지로 PC와 모바일을 함께 대응했습니다.', 26, { w: 796, color: '#444444', lh: 160 }),
    );
    const grid = col(24);
    const info = [
      ['목적', '일체형 구성으로도 쇼핑몰 전체 흐름(탐색 → 담기 → 주문)을 만들 수 있음을 보여주기'],
      ['내용 출처', '한살림 임산부꾸러미(mom.hansalim.or.kr)의 물품 · 사진 · 이용안내'],
      ['결과물', '홈 1개 + 서브페이지 11개\n(물품 · 이용안내 · 요리 · 소개 · 공지 · 장바구니 · 회원)'],
      ['기술', 'React 19 · Vite · React Router\nlocalStorage로 장바구니 · 로그인 · 포인트 구현'],
    ];
    for (let i = 0; i < 4; i += 2) {
      const rr = row(24);
      for (const [k, v] of info.slice(i, i + 2)) add(rr, add(card(418), T(k, 24, { bold: true, color: GREEN }), T(v, 22, { w: 354 })));
      grid.appendChild(rr);
    }
    add(r, left, grid);
    f.appendChild(r);
  });

  // 03 일체형 트렌드
  build('트렌드', () => {
    const f = slide('일체형 웹페이지', '02  TREND', '요즘 많이 쓰는 ‘일체형 웹페이지’');
    const r = row(80, { counterAxisAlignItems: 'CENTER' });
    const d = figma.createFrame();
    d.name = '일체형 구조도'; d.resize(900, 560); d.fills = solid('#F2F2F2'); d.cornerRadius = 16;
    const box = (x, y, w, h, label, stroke) => {
      const b = figma.createFrame();
      b.fills = solid('#FFFFFF'); b.cornerRadius = 12;
      if (stroke) { b.strokes = solid(stroke); b.strokeWeight = 4; }
      b.layoutMode = 'VERTICAL'; b.primaryAxisAlignItems = 'CENTER'; b.counterAxisAlignItems = 'CENTER';
      b.primaryAxisSizingMode = 'FIXED'; b.counterAxisSizingMode = 'FIXED';
      b.resize(w, h); b.x = x; b.y = y;
      b.appendChild(T(label, 20, { bold: true, color: '#555555', align: 'CENTER' }));
      d.appendChild(b);
    };
    box(60, 110, 230, 300, '왼쪽 패널\n\n검색창\n인기 태그\n배너');
    box(330, 30, 280, 500, '모바일 화면\n(최대 480px)\n\n헤더 · 슬라이더\n물품 · 요리 · 푸터\n\n하단 고정 메뉴', GREEN);
    box(780, 390, 70, 120, '▲\n\n▼');
    const dc = col(12);
    add(dc, d, T('PC 화면(1920px)에서 보이는 모습', 20, { color: SUB }));
    const txt = col(24);
    add(txt,
      T('일체형 웹페이지란?', 32, { bold: true }),
      T('PC에서도 모바일 크기의 화면을 가운데에 두고, 남는 양옆 공간에 검색 · 배너 · 바로가기를 두는 구성입니다.', 26, { w: 700, lh: 160 }),
      bullets([
        '휴대폰 쇼핑이 늘면서 모바일 화면을 먼저 설계하는 ‘모바일 퍼스트’가 기본이 됨',
        '브랜드몰 · 자사몰에서 PC와 모바일을 하나의 화면으로 운영하는 구성이 많이 쓰임',
        '하단 고정 메뉴, 가로 슬라이드, 카드형 목록처럼 앱 같은 화면을 PC에서도 그대로 사용',
      ], 700),
    );
    add(r, dc, txt);
    f.appendChild(r);
  });

  // 04 선택 이유
  build('이유', () => {
    const f = slide('일체형을 고른 이유', '03  WHY', '일체형으로 만든 이유', '이 구성으로 쇼핑몰을 만들 수 있고, 이런 점이 편리하다고 생각했습니다.');
    const r = row(26);
    const items = [
      ['01', '한 화면으로\nPC · 모바일 대응', '같은 화면 하나로 PC와 모바일을 함께 보여줘서, 화면을 두 벌 만들 필요가 없습니다.'],
      ['02', '어디서나\n같은 사용 경험', 'PC에서도 모바일과 같은 순서 · 같은 버튼으로 보이니, 휴대폰으로 장 보던 사용자가 헤매지 않습니다.'],
      ['03', '남는 공간을\n알차게 활용', 'PC의 빈 양옆에 검색창 · 인기 태그 · 배너를 고정해, 스크롤 중에도 언제든 검색할 수 있습니다.'],
      ['04', '관리와 수정이\n쉬움', '화면이 하나라 내용을 바꾸거나 기능을 더할 때 한 곳만 고치면 됩니다.'],
    ];
    for (const [n, t, b] of items) add(r, add(card(400, SOFT, 16, 40), T(n, 44, { bold: true, color: GREEN }), T(t, 32, { bold: true, w: 336, lh: 135 }), T(b, 23, { w: 336, color: '#444444', lh: 160 })));
    f.appendChild(r);
  });

  // 05 벤치마킹
  build('벤치마킹', () => {
    const f = slide('벤치마킹', '04  BENCHMARK', '벤치마킹 시안 × 한살림 내용', '참고한 일체형 페이지 시안의 섹션 순서와 디자인을 살리고, 내용은 한살림 임산부꾸러미로 채웠습니다.');
    const data = [
      ['상단 띠배너', '꾸러미 240,000원 지원 안내'],
      ['메인 슬라이더', '엄마와 아이의 건강 · 꼬마와땅 · 구매 방법'],
      ['카테고리 아이콘', '알뜰 · 간편식 · 건강 · 양념 · 채소'],
      ['인기상품', '임산부 인기물품 20개 (실제 이름 · 가격)'],
      ['신상품', '햇물품'],
      ['브랜드 소개', '한살림은 (생활협동조합 소개)'],
      ['타임딜', '유자청 타임딜 (디자인 예시)'],
      ['영상 속 상품', '한살림 바른 양념'],
      ['요리', '한살림 요리 (채소 / 고기 · 생선)'],
      ['주목 상품 목록', '모두가 눈여겨 보는 물품'],
      ['후기', '냠냠 맛있는 후기 (디자인 예시)'],
      ['인스타그램 · 푸터', '요리 사진 · 한살림 사업자 정보 · 상담실'],
    ];
    const tables = row(24);
    for (let s = 0; s < 12; s += 6) {
      const tb = col(0);
      const line = (a, b, head, i) => {
        const rr = row(0, { counterAxisAlignItems: 'CENTER' });
        pad(rr, 16, 20);
        rr.fills = solid(head ? GREEN : i % 2 ? '#FFFFFF' : '#F7F7F7');
        add(rr,
          T(a, 22, { w: 260, bold: true, color: head ? '#FFFFFF' : GREEN }),
          T(b, 22, head ? { w: 528, bold: true, color: '#FFFFFF' } : { w: 528 }));
        fixW(rr, 828);
        tb.appendChild(rr);
      };
      line('시안 구성', '한살림 내용', true, 0);
      data.slice(s, s + 6).forEach(([a, b], i) => line(a, b, false, i));
      tables.appendChild(tb);
    }
    f.appendChild(tables);
  });

  // 06 타깃 & 콘셉트
  build('타깃', () => {
    const f = slide('타깃과 콘셉트', '05  TARGET & CONCEPT', '누구를 위한 사이트인가');
    const r = row(24);
    const p = card(820, SOFT, 18, 40);
    add(p,
      T('주 사용자', 24, { bold: true, color: GREEN }),
      T('임신 중이거나 출산한 지 얼마 안 된 엄마', 32, { bold: true, w: 756 }),
      bullets(['휴대폰으로 틈틈이 장을 봄', '지원 사업이 처음이라 포인트 · 주문 규칙이 낯섦', '아이를 생각해 친환경 · 인증 정보를 꼼꼼히 확인함'], 756),
      T(' ', 12),
      T('그래서 필요한 것', 24, { bold: true, color: GREEN }),
      bullets(['한 손으로 쓰기 쉬운 모바일 화면', '주문 규칙을 화면에서 바로 알려주기', '인증 · 공급 상태를 카드에서 바로 보기'], 756),
    );
    const k = col(28);
    const chips = row(16);
    for (const w of ['건강한', '친환경', '쉬운']) { const ch = row(0); pad(ch, 14, 36); ch.cornerRadius = 40; ch.fills = solid(GREEN); ch.appendChild(T(w, 32, { bold: true, color: '#FFFFFF' })); chips.appendChild(ch); }
    add(k,
      T('콘셉트 키워드', 24, { bold: true, color: GREEN }),
      chips,
      T('“엄마와 아이의 건강을 응원하는,\n쉬운 친환경 장보기”', 40, { bold: true, w: 836, lh: 140 }),
      T('한살림의 초록색을 메인 색으로 쓰고, 둥근 카드와 큰 버튼으로 부드럽고 누르기 쉬운 화면을 만들었습니다.', 24, { w: 836, color: '#444444', lh: 160 }),
    );
    add(r, p, k);
    f.appendChild(r);
  });

  // 07 사이트맵
  build('사이트맵', () => {
    const f = slide('사이트맵', '06  SITEMAP', '사이트맵', '홈 1개와 서브페이지 11개. 헤더 메뉴 · 하단 메뉴 · 햄버거 메뉴 · 왼쪽 검색창에서 모두 연결됩니다.');
    const wrap = col(32, { counterAxisAlignItems: 'CENTER' });
    fixW(wrap, 1680);
    const home = row(0); pad(home, 18, 60); home.cornerRadius = 12; home.fills = solid(GREEN);
    home.appendChild(T('홈 (일체형 메인)', 30, { bold: true, color: '#FFFFFF' }));
    const r = row(16);
    const map = [
      ['#선택형 꾸러미', ['물품 목록\n(검색 · 카테고리 · 정렬)', '물품 상세']],
      ['이용안내', ['꾸러미 신청', '아이디 만들기', '주문/배송/결제', '반품/문의']],
      ['요리', ['요리 검색', '분류 · 정렬']],
      ['임산부꾸러미란?', ['사업 소개', '지원대상 · 지원내용']],
      ['한살림소개', ['한살림은', '한살림 물품은']],
      ['공지사항', ['공지 목록']],
      ['회원', ['로그인', '아이디 만들기', '마이페이지', '장바구니']],
    ];
    for (const [t, subs] of map) {
      const k = card(226, SOFT, 12, 24);
      pad(k, 24, 20);
      k.appendChild(T(t, 24, { bold: true, color: GREEN, w: 186 }));
      for (const s of subs) k.appendChild(T(s, 20, { w: 186, color: '#333333' }));
      r.appendChild(k);
    }
    add(wrap, home, T('▼', 28, { color: GREEN }), r);
    f.appendChild(wrap);
  });

  // 08 사용자 흐름
  build('흐름', () => {
    const f = slide('사용자 흐름', '07  USER FLOW', '가입부터 주문까지');
    const r = row(12, { counterAxisAlignItems: 'CENTER' });
    const steps = [
      ['아이디 만들기', '가입비 · 출자금 없이 가입'],
      ['포인트 지급', '꾸러미 포인트\n240,000원 즉시 지급'],
      ['물품 담기', '인기물품 · 햇물품 ·\n요리 재료 한 번에 담기'],
      ['규칙 확인', '1회 4만~10만 원,\n농산물 50% 이상\n자동 확인'],
      ['주문', '80%는 포인트\n(1회 최대 8만 원),\n20%만 본인 결제'],
      ['마이페이지', '남은 포인트 ·\n주문내역 · 관심상품'],
    ];
    steps.forEach(([t, b], i) => {
      if (i) r.appendChild(T('→', 36, { bold: true, color: GREEN }));
      r.appendChild(add(card(220, i === 3 ? '#FFF4E5' : SOFT, 10, 32), T('STEP ' + (i + 1), 20, { bold: true, color: GREEN }), T(t, 28, { bold: true, w: 156 }), T(b, 20, { w: 156, color: '#444444' })));
    });
    const note = card(1680, '#F7F7F7', 8, 28);
    note.appendChild(T('장바구니에서 농산물 비중 막대와 안내 문구로 주문 조건을 바로 보여줘, 사용자가 주문 전에 실수하지 않도록 했습니다. 규칙은 실제 이용안내 기준을 그대로 적용했습니다.', 24, { w: 1616, lh: 160 }));
    add(f, r, note);
  });

  // 09 주요 화면
  build('주요 화면', () => {
    const f = slide('주요 화면과 기능', '08  KEY SCREENS', '주요 화면과 기능');
    const r = row(40);
    const items = [
      ['홈', '/', '시안 구성 그대로의 일체형 메인.\n슬라이더 · 인기물품 · 타임딜 · 요리'],
      ['선택형 꾸러미', '/products', '구매 방법 3단계, 검색 · 카테고리 9개 · 정렬, 인증 · 공급 상태 태그'],
      ['장바구니', '/cart', '농산물 비중 막대, 포인트 80% · 본인 20% 자동 계산, 주문 조건 안내'],
      ['마이페이지', '/mypage', '남은 포인트, 주문내역, 관심상품 · 최근 본 상품'],
    ];
    for (const [t, path, d] of items) add(r, add(col(14), ph(390, 440, '화면 캡처 넣기\n' + path), T(t, 30, { bold: true }), T(d, 22, { w: 390, color: '#444444', lh: 155 })));
    f.appendChild(r);
  });

  // 10 디자인 가이드
  build('디자인 가이드', () => {
    const f = slide('디자인 가이드', '09  DESIGN GUIDE', '디자인 가이드');
    const wrap = col(44);
    const sec = (t, content) => add(col(18), T(t, 26, { bold: true, color: GREEN }), content);
    const sw = row(24);
    for (const [h, n] of [['#5FAE2A', '메인 초록'], ['#4A9420', '진한 초록'], ['#222222', '본문'], ['#777777', '보조 글자'], ['#E5E5E5', '구분선'], ['#EE3333', '할인 · 경고'], ['#14B3C4', '구매 방법 안내']]) {
      const r = figma.createRectangle(); r.resize(200, 110); r.cornerRadius = 12; r.fills = solid(h);
      if (h === '#E5E5E5') { r.strokes = solid('#CCCCCC'); r.strokeWeight = 1; }
      sw.appendChild(add(col(6), r, T(n, 20, { bold: true }), T(h, 18, { color: SUB })));
    }
    const ty = row(64, { counterAxisAlignItems: 'MAX' });
    add(ty,
      add(col(4), T('Pretendard', 44, { bold: true }), T('기본 글꼴', 18, { color: SUB })),
      add(col(4), T('섹션 제목', 34, { bold: true }), T('22px Bold', 18, { color: SUB })),
      add(col(4), T('물품 이름', 26, { bold: true }), T('14px Bold', 18, { color: SUB })),
      add(col(4), T('설명 · 본문', 24), T('13~14px Regular', 18, { color: SUB })),
      add(col(4), T('태그 · 보조', 20, { color: SUB }), T('11~12px', 18, { color: SUB })),
    );
    const comp = row(28, { counterAxisAlignItems: 'CENTER' });
    const btn = row(0); pad(btn, 18, 32); btn.cornerRadius = 8; btn.fills = solid(GREEN); btn.appendChild(T('장바구니 담기', 22, { bold: true, color: '#FFFFFF' }));
    const line = row(0); pad(line, 18, 32); line.cornerRadius = 8; line.fills = solid('#FFFFFF'); line.strokes = solid(GREEN); line.strokeWeight = 2; line.appendChild(T('♡ 관심상품', 22, { bold: true, color: GREEN }));
    const more = row(0); pad(more, 8, 20); more.cornerRadius = 20; more.fills = solid(GREEN); more.appendChild(T('전체보기', 18, { color: '#FFFFFF' }));
    const tags = row(8);
    for (const [t, color, fill] of [['인기', '#FFFFFF', GREEN], ['무농약', GREEN, null], ['유기농', GREEN, null], ['햇물품', '#F08C00', null], ['공급중단', '#EE3333', null]]) {
      const g = row(0); pad(g, 4, 12); g.cornerRadius = 6; g.fills = solid(fill || '#FFFFFF');
      g.strokes = solid(fill || color); g.strokeWeight = 2; g.appendChild(T(t, 18, { color })); tags.appendChild(g);
    }
    const bar = figma.createFrame(); bar.resize(300, 8); bar.cornerRadius = 4; bar.fills = solid('#E5E5E5'); bar.name = '진행 막대';
    const fillBar = figma.createRectangle(); fillBar.resize(110, 8); fillBar.cornerRadius = 4; fillBar.fills = solid(GREEN); bar.appendChild(fillBar);
    add(comp, btn, line, more, tags, add(col(8), bar, T('슬라이드 진행 막대', 16, { color: SUB })));
    add(wrap, sec('색상', sw), sec('글자', ty), sec('컴포넌트', comp));
    f.appendChild(wrap);
  });

  // 11 회고
  build('회고', () => {
    const f = slide('회고', '10  REVIEW', '회고');
    const r = row(24);
    add(r,
      add(card(828, SOFT, 16, 40), T('어려웠던 점과 해결', 30, { bold: true, color: GREEN }), T('[직접 작성]\n예) 실제 사이트 데이터와 벤치마킹 시안의 구성이 달라, 섹션마다 어울리는 한살림 내용을 찾아 연결한 과정', 24, { w: 764, color: '#555555', lh: 160 })),
      add(card(828, SOFT, 16, 40), T('아쉬운 점 · 다음 계획', 30, { bold: true, color: GREEN }), T('[직접 작성]\n예) 다국어 지원, 실제 서버 · 결제 연동, 이미지로만 된 소개 내용을 글로 옮겨 접근성 높이기', 24, { w: 764, color: '#555555', lh: 160 })),
    );
    const note = card(1680, '#F7F7F7', 8, 28);
    note.appendChild(T('※ 포트폴리오용으로 제작한 사이트입니다. 물품 정보와 사진은 한살림 임산부꾸러미에서 가져왔으며, 할인 · 타임딜 · 후기 · 일부 가격은 디자인 예시입니다.', 22, { w: 1616, color: SUB, lh: 160 }));
    add(f, r, note);
  });

  figma.viewport.scrollAndZoomIntoView(slides);
  return errors.length ? '일부 실패: ' + errors.join(' / ') : '기획서 ' + slides.length + '장 완성 (글꼴: ' + fam + ')';
}

main()
  .then((msg) => figma.closePlugin(msg))
  .catch((e) => figma.closePlugin('오류: ' + e.message));
