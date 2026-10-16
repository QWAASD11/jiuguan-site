/* 半醉酒馆 · 交互脚本 */
(function () {
  'use strict';
  var C = window.JG_CONFIG || {};
  var KEY = (C.storageKeys||{});
  var CART_KEY = KEY.cart || 'jiuguan_cart_v1';
  var ORDER_KEY = KEY.orders || 'jiuguan_orders_v1';

  /* ---------------- 酒品类型 ---------------- */
  var TYPES = [
    { name:'白酒', desc:'酱香、浓香、清香，按杯按瓶都有', price:38, img:'assets/img/wine-baijiu.png' },
    { name:'红酒', desc:'干红、甜红，配餐或独饮都合适', price:48, img:'assets/img/wine-red.png' },
    { name:'精酿啤酒', desc:'每周换新，小麦、IPA、世涛', price:28, img:'assets/img/wine-beer.png' },
    { name:'洋酒', desc:'威士忌、伏特加、金酒', price:58, img:'assets/img/wine-whisky.png' },
    { name:'果酒米酒', desc:'梅子酒、桂花酒、米酒，女生爱喝', price:32, img:'assets/img/wine-fruit.png' },
    { name:'无酒精', desc:'茶饮、气泡水、鲜榨，开车也能喝', price:18, img:'assets/img/wine-soft.png' }
  ];

  /* ---------------- 完整酒单（价目表） ---------------- */
  var WINES = [
    { name:'酱香白酒', cat:'白酒', cup:38, bottle:268, hot:true,
      sub:'入口绵柔，回味悠长',
      feat:['53 度，正宗酱香型','单杯 50ml / 整瓶 500ml','配花生米最搭'],
      img:'assets/img/wine-baijiu.png' },
    { name:'浓香白酒', cat:'白酒', cup:32, bottle:228, hot:false,
      sub:'香气浓，入口甜',
      feat:['42 度，好入口，不上头','单杯 50ml / 整瓶 500ml','适合不太能喝的朋友'],
      img:'assets/img/wine-baijiu.png' },
    { name:'干红葡萄酒', cat:'红酒', cup:48, bottle:328, hot:true,
      sub:'单宁柔顺，果香明显',
      feat:['法国产区，年份可选','单杯 150ml / 整瓶 750ml','醒酒 15 分钟更香'],
      img:'assets/img/wine-red.png' },
    { name:'甜红葡萄酒', cat:'红酒', cup:42, bottle:288, hot:false,
      sub:'微甜，女生喜欢',
      feat:['低单宁，入口顺','单杯 150ml / 整瓶 750ml','配甜点很搭'],
      img:'assets/img/wine-red.png' },
    { name:'小麦精酿', cat:'精酿啤酒', cup:28, bottle:88, hot:true,
      sub:'泡沫细腻，麦香足',
      feat:['4.5 度，清爽好喝','单杯 400ml / 整瓶 1L','每周换新口味'],
      img:'assets/img/wine-beer.png' },
    { name:'IPA 精酿', cat:'精酿啤酒', cup:32, bottle:98, hot:false,
      sub:'啤酒花香浓，微苦回甘',
      feat:['6 度，风味层次足','单杯 400ml / 整瓶 1L','啤酒爱好者首选'],
      img:'assets/img/wine-beer.png' },
    { name:'单一麦芽威士忌', cat:'洋酒', cup:68, bottle:468, hot:true,
      sub:'泥煤味、果香、木桶层次',
      feat:['40 度，纯饮或加冰皆可','单杯 45ml / 整瓶 700ml','慢慢喝，别急'],
      img:'assets/img/wine-whisky.png' },
    { name:'金汤力', cat:'洋酒', cup:58, bottle:0, hot:false,
      sub:'清爽，适合开胃',
      feat:['金酒 + 汤力水 + 青柠','单杯 300ml','只按杯卖，不整瓶'],
      img:'assets/img/wine-whisky.png' },
    { name:'梅子酒', cat:'果酒米酒', cup:32, bottle:198, hot:true,
      sub:'酸甜适口，冰镇最好',
      feat:['12 度，微醺刚好','单杯 120ml / 整瓶 720ml','女生点得最多'],
      img:'assets/img/wine-fruit.png' },
    { name:'桂花米酒', cat:'果酒米酒', cup:28, bottle:168, hot:false,
      sub:'米香清甜，带桂花香',
      feat:['6 度，像甜饮料','单杯 150ml / 整瓶 500ml','配小食解腻'],
      img:'assets/img/wine-fruit.png' },
    { name:'无酒精莫吉托', cat:'无酒精', cup:26, bottle:0, hot:false,
      sub:'薄荷青柠，清爽解腻',
      feat:['0 度，开车也能喝','单杯 300ml','只按杯卖'],
      img:'assets/img/wine-soft.png' },
    { name:'鲜榨果汁', cat:'无酒精', cup:22, bottle:0, hot:false,
      sub:'当天现榨，不加水',
      feat:['当季水果，问店员','单杯 300ml','只按杯卖'],
      img:'assets/img/wine-soft.png' }
  ];

  /* ---------------- 客户好评 ---------------- */
  var REVIEWS = [
    { text:'老板人挺好的，一个人来也不会尴尬。点了杯梅子酒，坐了一晚上，很舒服。', name:'小林', meta:'白领 · 常客', star:5 },
    { text:'和朋友聚会来的，点了整瓶威士忌，老板还送了小食。氛围很好，不吵。', name:'张先生', meta:'公司主管', star:5 },
    { text:'精酿每周都换，每次来都有新口味试。IPA 那个很不错，回甘明显。', name:'阿杰', meta:'啤酒爱好者', star:5 },
    { text:'生日那天来的，老板帮忙留了靠窗位置，还送了一杯。很用心。', name:'陈女士', meta:'回头客', star:5 },
    { text:'不太能喝酒，点了无酒精莫吉托，做得挺好喝的，不像敷衍。', name:'小王', meta:'不喝酒人士', star:5 },
    { text:'位置好找，门口灯牌明显。价格实在，不宰客，会再来。', name:'刘先生', meta:'新客', star:4 }
  ];

  /* ---------------- FAQ ---------------- */
  var FAQ = [
    { q:'营业时间是什么时候？', a:'每天 17:00 到凌晨 02:00，全年无休。周末和节假日位置比较紧，建议提前一天电话预订。' },
    { q:'可以提前订座吗？', a:'可以。网页上填预订表单，或者直接打 187 2330 8413。8 人以上的聚会请提前来电沟通。' },
    { q:'有最低消费吗？', a:'没有最低消费。点一杯也能坐一晚上，不催单、不限时。' },
    { q:'可以带生日蛋糕吗？', a:'可以，我们不收开瓶费也不收蛋糕费。提前说一声，我们帮你留好位置、准备餐具。' },
    { q:'能外送吗？', a:'目前只做堂食，不提供外送服务。酒类外送涉及资质问题，我们不做。' },
    { q:'可以刷卡/扫码吗？', a:'可以。微信、支付宝、现金都行，也支持 ARK 等加密资产。' },
    { q:'未成年人可以进吗？', a:'不可以。本店不向未成年人售酒，进门会查验。这也是法律规定。' },
    { q:'喝完怎么回家？', a:'店里有本地代驾的联系方式，可以帮你叫。为了安全，喝了酒千万别开车。' },
    { q:'能包场吗？', a:'可以，8 人以上可以沟通包场，费用按人数和酒水另算。提前 2-3 天联系最好。' },
    { q:'有存酒服务吗？', a:'有的。整瓶白酒、威士忌喝不完可以存，我们贴标签写名字，下次来接着喝。' }
  ];

  var BGMS = [{ name:(C.shop&&C.shop.name ? C.shop.name+' · 店内音乐' : '店内音乐'), src:'assets/audio/bgm1.mp3' }];

  function $(s,r){ return (r||document).querySelector(s); }
  function $$(s,r){ return Array.prototype.slice.call((r||document).querySelectorAll(s)); }
  function money(n){ return '¥'+Number(n).toLocaleString('zh-CN'); }
  function esc(s){ return String(s==null?'':s).replace(/[&<>"']/g,function(c){
    return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]; }); }
  function toast(t){ var e=$('#toast'); if(!e) return; e.textContent=t; e.classList.add('on');
    clearTimeout(e._t); e._t=setTimeout(function(){ e.classList.remove('on'); },2200); }
  function load(k,d){ try{ var v=localStorage.getItem(k); return v?JSON.parse(v):d; }catch(e){ return d; } }
  function save(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){} }

  var nav=$('#nav');
  function onScroll(){ if(nav) nav.classList.toggle('solid', window.scrollY>60); }
  window.addEventListener('scroll',onScroll,{passive:true}); onScroll();

  /* 酒品类型 */
  function renderTypes(){
    var g=$('#styleGrid'); if(!g) return;
    g.innerHTML = TYPES.map(function(t){
      return '<div class="style-card" data-type="'+esc(t.name)+'">'+
        '<img src="'+t.img+'" alt="'+esc(t.name)+'" loading="lazy">'+
        '<div class="style-ov"></div><div class="style-price">'+money(t.price)+' 起</div>'+
        '<div class="style-info"><h3>'+esc(t.name)+'</h3><p>'+esc(t.desc)+'</p></div></div>';
    }).join('');
    if(!g._b){ g._b=true;
      g.addEventListener('click',function(e){
        var c=e.target.closest('.style-card'); if(!c) return;
        var n=c.getAttribute('data-type');
        var sel=$('#fWine'); if(sel) sel.value=n;
        updateSummary();
        var o=document.querySelector('#order'); if(o) o.scrollIntoView({behavior:'smooth'});
        toast('已选择：'+n);
      });
    }
  }

  /* 价目表 */
  function renderPrices(){
    var g=$('#priceGrid'); if(!g) return;
    g.innerHTML = WINES.map(function(w){
      var prices = w.bottle>0
        ? '<div class="pc-prices"><div><b>'+w.cup+'</b><span>元</span><i>单杯</i></div>'+
          '<div style="color:#d8cdc2">/</div>'+
          '<div><b>'+w.bottle+'</b><span>元</span><i>整瓶</i></div></div>'
        : '<div class="pc-prices"><div><b>'+w.cup+'</b><span>元</span><i>单杯</i></div></div>';
      return '<div class="price-card'+(w.hot?' featured':'')+'">'+
        (w.hot?'<div class="pc-hot">招 牌</div>':'')+
        '<div class="pc-name">'+esc(w.name)+'</div><div class="pc-sub">'+esc(w.sub)+'</div>'+
        prices+
        '<div class="pc-unit">'+(w.bottle>0?'按杯 / 按瓶两种卖法':'仅按杯出售')+'</div>'+
        '<ul class="pc-feat">'+w.feat.map(function(f){ return '<li>'+esc(f)+'</li>'; }).join('')+'</ul>'+
        '<button class="pc-btn" data-wine="'+esc(w.name)+'">加入酒单</button></div>';
    }).join('');
    if(!g._b){ g._b=true;
      g.addEventListener('click',function(e){
        var b=e.target.closest('[data-wine]'); if(!b) return;
        var n=b.getAttribute('data-wine');
        var w=WINES.filter(function(x){ return x.name===n; })[0];
        if(w) addToCart(w);
      });
    }
  }

  /* 好评 */
  function renderReviews(){
    var g=$('#reviewGrid'); if(!g) return;
    g.innerHTML = REVIEWS.map(function(r){
      var stars=''; for(var i=0;i<5;i++) stars += (i<r.star?'★':'☆');
      return '<div class="review-card"><div class="rc-stars">'+stars+'</div>'+
        '<div class="rc-text">「'+esc(r.text)+'」</div>'+
        '<div class="rc-user"><div class="rc-avatar">'+esc(r.name.charAt(0))+'</div>'+
        '<div><div class="rc-name">'+esc(r.name)+'</div><div class="rc-meta">'+esc(r.meta)+'</div></div></div></div>';
    }).join('');
  }

  /* FAQ */
  function renderFaq(){
    var w=$('#faqList'); if(!w) return;
    w.innerHTML = FAQ.map(function(f){
      return '<div class="faq-item"><button class="faq-q" type="button">'+esc(f.q)+
        '<span>＋</span></button><div class="faq-a">'+esc(f.a)+'</div></div>';
    }).join('');
    if(!w._b){ w._b=true;
      w.addEventListener('click',function(e){
        var q=e.target.closest('.faq-q'); if(!q) return;
        var it=q.parentElement, open=it.classList.contains('open');
        $$('.faq-item').forEach(function(el){ el.classList.remove('open'); });
        if(!open) it.classList.add('open');
      });
    }
  }

  /* 表单选项 */
  function fillSelects(){
    var s=$('#fWine');
    if(s) s.innerHTML='<option value="">不限（听店员推荐）</option>'+TYPES.map(function(t){
      return '<option value="'+esc(t.name)+'">'+esc(t.name)+'（'+t.price+'元起）</option>'; }).join('');
  }
  function calcPrice(){
    var sel=$('#fWine') ? $('#fWine').value : '';
    if(!sel) return 0;
    var t=TYPES.filter(function(x){ return x.name===sel; })[0];
    return t?t.price:0;
  }
  function updateSummary(){
    var sel=$('#fWine')?$('#fWine').value:'';
    var s=$('#sumText'); if(s) s.textContent = sel?sel:'—';
    var p=$('#sumPrice'); if(p) p.textContent = money(calcPrice());
  }
  function genNo(){ var d=new Date(), p=function(n){ return n<10?'0'+n:''+n; };
    return 'JG'+d.getFullYear()+p(d.getMonth()+1)+p(d.getDate())+p(d.getHours())+p(d.getMinutes())+p(d.getSeconds()); }
  function saveOrder(o){ var l=load(ORDER_KEY,[]); l.unshift(o); save(ORDER_KEY,l); }

  var mf=$('#orderForm');
  if(mf) mf.addEventListener('submit',function(e){
    e.preventDefault();
    var name=$('#fName').value.trim(), phone=$('#fPhone').value.trim();
    var date=$('#fDate').value, time=$('#fTime').value, people=$('#fPeople').value;
    if(!name||!phone||!date||!time||!people){ toast('带 * 的项目都要填哦'); return; }
    if(!/^1[3-9]\d{9}$/.test(phone.replace(/\s|-/g,''))){ toast('手机号格式看起来不太对'); return; }
    var d=new Date(), p=function(n){ return n<10?'0'+n:''+n; }, no=genNo();
    saveOrder({ no:no, type:'座位预订', time:d.toISOString(),
      timeText:d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes()),
      name:name, phone:phone, visitDate:date, visitTime:time, people:people,
      wine:$('#fWine')?$('#fWine').value:'', note:$('#fNote')?$('#fNote').value.trim():'',
      total:calcPrice(), status:'待跟进' });
    $('#modalOrderNo').textContent=no;
    $('#modalMask').classList.add('on');
    mf.reset(); updateSummary();
  });
  if($('#fWine')) $('#fWine').addEventListener('change',updateSummary);

  /* 购物车 */
  var cart=load(CART_KEY,[]);
  function cartTotal(){ return cart.reduce(function(s,i){ return s+i.qty*i.price; },0); }
  function cartCount(){ return cart.reduce(function(s,i){ return s+i.qty; },0); }
  function updateBadge(){ var el=$('#cartCount'); if(!el) return;
    var n=cartCount(); el.textContent=n; el.classList.toggle('on',n>0); }
  function addToCart(w){
    var f=cart.filter(function(x){ return x.name===w.name; })[0];
    if(f) f.qty+=1;
    else cart.push({ name:w.name, price:w.cup, qty:1, unit:'杯' });
    save(CART_KEY,cart); updateBadge(); renderCart();
    toast('已加入酒单：'+w.name);
  }
  function renderCart(){
    var body=$('#cartBody'), foot=$('#cartFoot'); if(!body) return;
    if(!cart.length){
      body.innerHTML='<div class="cart-empty"><span>🍶</span><p>酒单还是空的</p>'+
        '<a href="#price" class="btn btn-line" id="goPrice">去看看有什么酒</a></div>';
      var gp=$('#goPrice'); if(gp) gp.addEventListener('click',closeDrawer);
      if(foot) foot.style.display='none'; return;
    }
    body.innerHTML=cart.map(function(it,idx){
      return '<div class="cart-item"><div class="ci-info"><b>'+esc(it.name)+'</b><span>'+money(it.price)+' / '+esc(it.unit)+'</span>'+
        '<div class="ci-qty"><button class="qty-btn" data-act="minus" data-i="'+idx+'">−</button>'+
        '<input type="number" min="1" value="'+it.qty+'" data-act="set" data-i="'+idx+'">'+
        '<button class="qty-btn" data-act="plus" data-i="'+idx+'">+</button></div></div>'+
        '<button class="ci-del" data-act="del" data-i="'+idx+'">✕</button></div>';
    }).join('');
    if(foot) foot.style.display='block';
    var ct=$('#cartTotal'); if(ct) ct.textContent=money(cartTotal());
  }
  document.addEventListener('click',function(e){
    var a=e.target.closest('[data-act]'); if(!a) return;
    var i=parseInt(a.getAttribute('data-i'),10), act=a.getAttribute('data-act');
    if(act==='plus') cart[i].qty+=1;
    else if(act==='minus') cart[i].qty=Math.max(1,cart[i].qty-1);
    else if(act==='del') cart.splice(i,1);
    save(CART_KEY,cart); updateBadge(); renderCart();
  });
  document.addEventListener('change',function(e){
    var inp=e.target.closest('input[data-act="set"]'); if(!inp) return;
    var i=parseInt(inp.getAttribute('data-i'),10);
    cart[i].qty=Math.max(1,parseInt(inp.value,10)||1);
    save(CART_KEY,cart); updateBadge(); renderCart();
  });
  function openDrawer(){ $('#cartDrawer').classList.add('on'); $('#drawerMask').classList.add('on'); document.body.style.overflow='hidden'; }
  function closeDrawer(){ $('#cartDrawer').classList.remove('on'); $('#drawerMask').classList.remove('on'); document.body.style.overflow=''; }
  if($('#cartBtn')) $('#cartBtn').addEventListener('click',openDrawer);
  if($('#drawerClose')) $('#drawerClose').addEventListener('click',closeDrawer);
  if($('#drawerMask')) $('#drawerMask').addEventListener('click',closeDrawer);

  var qf=$('#quickForm');
  if(qf) qf.addEventListener('submit',function(e){
    e.preventDefault();
    if(!cart.length) return;
    var name=$('#qcName').value.trim(), phone=$('#qcPhone').value.trim();
    if(!name||!phone){ toast('请填写称呼和电话'); return; }
    if(!/^1[3-9]\d{9}$/.test(phone.replace(/\s|-/g,''))){ toast('手机号格式看起来不太对'); return; }
    var d=new Date(), p=function(n){ return n<10?'0'+n:''+n; }, no=genNo();
    saveOrder({ no:no, type:'酒单预选', time:d.toISOString(),
      timeText:d.getFullYear()+'-'+p(d.getMonth()+1)+'-'+p(d.getDate())+' '+p(d.getHours())+':'+p(d.getMinutes()),
      name:name, phone:phone, arrive:$('#qcTime')?$('#qcTime').value.trim():'',
      items:cart.map(function(i){ return {name:i.name,qty:i.qty,price:i.price,sum:i.qty*i.price}; }),
      total:cartTotal(), status:'待跟进' });
    $('#modalOrderNo').textContent=no;
    $('#modalMask').classList.add('on');
    cart=[]; save(CART_KEY,cart); updateBadge(); renderCart(); qf.reset();
  });
  if($('#modalClose')) $('#modalClose').addEventListener('click',function(){ $('#modalMask').classList.remove('on'); closeDrawer(); });
  if($('#modalMask')) $('#modalMask').addEventListener('click',function(e){ if(e.target===this){ this.classList.remove('on'); closeDrawer(); } });

  /* 背景音乐 */
  var bgmAudio=$('#bgmAudio'), bgmIdx=0, bgmPlaying=false, bgmInit=false;
  function fmt(s){ if(!isFinite(s)||s<0) s=0; var m=Math.floor(s/60), x=Math.floor(s%60); return m+':'+(x<10?'0'+x:x); }
  function renderBgm(){
    var l=$('#bgmList'); if(!l) return;
    l.innerHTML=BGMS.map(function(b,i){
      return '<button class="bgm-track'+(i===bgmIdx?' active':'')+'" data-bgm="'+i+'">'+
        '<span class="bt-idx">'+(i+1)+'</span><span class="bt-name">'+esc(b.name)+'</span>'+
        '<span class="bt-eq"><i></i><i></i><i></i></span></button>';
    }).join('');
  }
  function loadBgm(i,play){
    if(!BGMS.length) return;
    bgmIdx=(i+BGMS.length)%BGMS.length;
    bgmAudio.src=BGMS[bgmIdx].src;
    $('#bgmTitle').textContent=BGMS[bgmIdx].name;
    renderBgm(); if(play) playBgm();
  }
  function playBgm(){
    if(!BGMS.length){ $('#bgmState').textContent='暂无音乐文件'; return; }
    bgmAudio.volume=($('#bgmVol').value||40)/100;
    var p=bgmAudio.play();
    if(p&&p.catch){ p.then(function(){ bgmPlaying=true; setBgm(); })
      .catch(function(){ bgmPlaying=false; setBgm(); $('#bgmState').textContent='音乐文件未就绪'; }); }
  }
  function setBgm(){
    var b=$('#bgm'); if(b) b.classList.toggle('playing',bgmPlaying);
    $('#bgmPlay').textContent=bgmPlaying?'❚❚':'▶';
    if(bgmPlaying) $('#bgmState').textContent='正在播放';
    else if(!bgmAudio.src){ $('#bgmState').textContent='请把 mp3 放入 assets/audio/'; $('#bgmTitle').textContent='暂无音乐'; }
    else $('#bgmState').textContent='已暂停';
    renderBgm();
  }
  function toggleBgm(){
    if(bgmPlaying){ bgmAudio.pause(); bgmPlaying=false; setBgm(); }
    else { if(!bgmAudio.src) loadBgm(bgmIdx,false); playBgm(); }
  }
  if($('#bgmToggle')) $('#bgmToggle').addEventListener('click',function(e){
    e.stopPropagation();
    var pnl=$('#bgmPanel'), opening=!pnl.classList.contains('on');
    pnl.classList.toggle('on'); $('#bgm').classList.toggle('opened',opening);
    if(!bgmInit){ bgmInit=true; loadBgm(0,false); }
    if(opening&&!bgmPlaying) playBgm();
  });
  if($('#bgmClose')) $('#bgmClose').addEventListener('click',function(e){ e.stopPropagation(); $('#bgmPanel').classList.remove('on'); });
  document.addEventListener('click',function(e){ if(!e.target.closest('#bgm')) $('#bgmPanel').classList.remove('on'); });
  if($('#bgmPlay')) $('#bgmPlay').addEventListener('click',toggleBgm);
  if($('#bgmPrev')) $('#bgmPrev').addEventListener('click',function(){ loadBgm(bgmIdx-1,true); });
  if($('#bgmNext')) $('#bgmNext').addEventListener('click',function(){ loadBgm(bgmIdx+1,true); });
  if($('#bgmVol')) $('#bgmVol').addEventListener('input',function(){ bgmAudio.volume=this.value/100; });
  document.addEventListener('click',function(e){
    var t=e.target.closest('[data-bgm]'); if(!t) return;
    var i=parseInt(t.getAttribute('data-bgm'),10);
    if(i===bgmIdx&&bgmPlaying) return;
    loadBgm(i,true);
  });
  if(bgmAudio){
    bgmAudio.addEventListener('timeupdate',function(){
      var d=bgmAudio.duration||0, c=bgmAudio.currentTime||0;
      var f=$('#bgmFill'); if(f) f.style.width=(d?c/d*100:0)+'%';
      var cu=$('#bgmCur'); if(cu) cu.textContent=fmt(c);
      var du=$('#bgmDur'); if(du) du.textContent=fmt(d);
    });
    bgmAudio.addEventListener('loadedmetadata',function(){ var du=$('#bgmDur'); if(du) du.textContent=fmt(bgmAudio.duration); });
    bgmAudio.addEventListener('ended',function(){ loadBgm(bgmIdx+1,true); });
    bgmAudio.addEventListener('play',function(){ bgmPlaying=true; setBgm(); });
    bgmAudio.addEventListener('pause',function(){ bgmPlaying=false; setBgm(); });
  }
  if($('#bgmBar')) $('#bgmBar').addEventListener('click',function(e){
    if(!bgmAudio.duration) return;
    var r=this.getBoundingClientRect();
    bgmAudio.currentTime=Math.max(0,Math.min(1,(e.clientX-r.left)/r.width))*bgmAudio.duration;
  });
  if($('#bgmList')) $('#bgmList').classList.add('on');
  var firstTry=function(){
    if(bgmPlaying){ document.removeEventListener('click',firstTry); return; }
    if(!bgmAudio.src) loadBgm(0,false);
    if(BGMS.length){ bgmAudio.volume=($('#bgmVol').value||40)/100;
      var p=bgmAudio.play(); if(p&&p.then) p.then(function(){ bgmPlaying=true; setBgm(); }).catch(function(){}); }
    document.removeEventListener('click',firstTry);
  };
  document.addEventListener('click',firstTry,{once:true});

  /* 应用配置 */
  function applyConfig(){
    if(C.contact){
      var ph=C.contact.phone, pd=C.contact.phoneDisplay||ph;
      if(ph) $$('a[href^="tel:"]').forEach(function(a){ a.setAttribute('href','tel:'+ph); });
      if(pd){ $$('.sc-main').forEach(function(el){ if(el.textContent.indexOf('187')>-1) el.textContent=pd; });
              $$('.os-row b').forEach(function(el){ if(el.textContent.indexOf('187')>-1) el.textContent=pd; }); }
    }
    if(C.shop){
      var addr=$('#shopAddr'); if(addr && C.shop.address) addr.textContent=C.shop.address;
      if(C.shop.hours){ $$('.mi-row b').forEach(function(el){ if(el.textContent.indexOf('17:00')>-1) el.textContent=C.shop.hours; });
        $$('.service-hours').forEach(function(el){ if(el.textContent.indexOf('17:00')>-1) el.innerHTML='<span class="sh-dot"></span><b>营业时间</b>　'+esc(C.shop.hours)+'　｜　周末建议提前预订'; }); }
      /* 地图 */
      var q = C.shop.lng && C.shop.lat ? (C.shop.lng+','+C.shop.lat) : encodeURIComponent(C.shop.address||'');
      var mf2=$('#mapFrame');
      if(mf2 && C.shop.address && C.shop.address.indexOf('请')===-1){
        mf2.src = (C.shop.lng&&C.shop.lat)
          ? 'https://uri.amap.com/marker?position='+C.shop.lng+','+C.shop.lat+'&name='+encodeURIComponent(C.shop.name)+'&src=jiuguan&coordinate=gaode&callnative=1'
          : 'https://uri.amap.com/search?keyword='+encodeURIComponent(C.shop.address);
      }
      var ml=$('#mapLink');
      if(ml) ml.href='https://uri.amap.com/search?keyword='+encodeURIComponent(C.shop.address||'');
    }
    if(C.ark){
      var box=$('#arkPayCard');
      if(box&&C.ark.enabled===false) box.style.display='none';
      else if(box){
        if(C.ark.chain){ var e1=$('#arkChain'); if(e1) e1.textContent=C.ark.chain; }
        if(C.ark.coin){ var e2=$('#arkCoin'); if(e2) e2.textContent=C.ark.coin; }
        var ae=$('#arkAddr'), cb=$('#arkCopy');
        if(ae){
          if(C.ark.address&&C.ark.address.length>6){ ae.textContent=C.ark.address; ae.classList.add('has-addr'); if(cb) cb.style.display='inline-flex'; }
          else { ae.textContent='待填写 · 请在 config.js 中设置 ark.address'; ae.classList.remove('has-addr'); if(cb) cb.style.display='none'; }
        }
        var q2=$('#arkQrImg'), qp=$('#arkQrPh');
        if(C.ark.qrImage&&q2){ q2.src=C.ark.qrImage; q2.onload=function(){ if(qp) qp.style.display='none'; }; }
        if(C.ark.rateText){ var rb=$('#arkRate'), rt=$('#arkRateText'); if(rb) rb.style.display='flex'; if(rt) rt.textContent=C.ark.rateText; }
      }
    }
    if(C.pay){
      var wq=document.querySelector('img[alt="微信收款码"]'); if(wq&&C.pay.wechatQr) wq.src=C.pay.wechatQr;
      var aq=document.querySelector('img[alt="支付宝收款码"]'); if(aq&&C.pay.alipayQr) aq.src=C.pay.alipayQr;
    }
    if(C.bgm&&C.bgm.length){ BGMS.length=0; C.bgm.forEach(function(b){ BGMS.push(b); }); renderBgm(); }
  }

  if($('#arkCopy')) $('#arkCopy').addEventListener('click',function(){
    var el=$('#arkAddr'), txt=el?el.textContent.trim():'';
    if(!txt||txt.indexOf('待填写')>-1){ toast('请先在 config.js 里填写 ARK 收款地址'); return; }
    var done=function(){ var b=$('#arkCopy'); b.textContent='已复制 ✓'; b.classList.add('copied');
      setTimeout(function(){ b.textContent='复制'; b.classList.remove('copied'); },1800); };
    if(navigator.clipboard&&navigator.clipboard.writeText){
      navigator.clipboard.writeText(txt).then(done).catch(function(){
        var ta=document.createElement('textarea'); ta.value=txt; document.body.appendChild(ta); ta.select();
        try{ document.execCommand('copy'); done(); }catch(e){ toast('复制失败，请长按手动复制'); } ta.remove();
      });
    } else {
      var t2=document.createElement('textarea'); t2.value=txt; document.body.appendChild(t2); t2.select();
      try{ document.execCommand('copy'); done(); }catch(e){ toast('复制失败，请长按手动复制'); } t2.remove();
    }
  });

  $$('a[href^="#"]').forEach(function(a){
    a.addEventListener('click',function(e){
      var id=this.getAttribute('href'); if(id==='#'||id.length<2) return;
      var t=document.querySelector(id); if(!t) return;
      e.preventDefault(); window.scrollTo({top:t.offsetTop-72,behavior:'smooth'});
    });
  });

  renderTypes(); renderPrices(); renderReviews(); renderFaq(); fillSelects();
  updateSummary(); updateBadge(); renderCart(); applyConfig(); renderBgm(); setBgm();

  window.JGSHOP = { getOrders:function(){ return load(ORDER_KEY,[]); },
    clearOrders:function(){ save(ORDER_KEY,[]); }, wines:WINES, types:TYPES };
})();
