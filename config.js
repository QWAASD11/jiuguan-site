/* 半醉酒馆 · 网站配置 —— 只改这个文件，不用动其他代码 */

window.JG_CONFIG = {

  /* ========== 一、店铺信息 ========== */
  shop: {
    name: '半醉酒馆',
    slogan: '有酒，有故事',
    /* ★ 店铺地址（地图导航用，请填完整地址）★ */
    address: '重庆市大都会1号楼',
    /* 地图坐标（可选，高德搜到你的店后，把经纬度填这里更准） */
    lng: '',
    lat: '',
    hours: '每天 17:00 — 02:00'
  },

  /* ========== 二、联系方式 ========== */
  contact: {
    phone: '18723308413',
    phoneDisplay: '187 2330 8413',
    wechat: ''
  },

  /* ========== 三、ARK 收款 ========== */
  ark: {
    enabled: true,
    chain: 'BSC（BNB Chain）',
    coin: 'ARK',
    /* ★★★ 你的收款地址 ★★★ */
    address: '0x6DCdef6AA746c845FBd5ABB7A57838b07f604A01',
    rateText: '',
    qrImage: 'assets/img/pay-ark.png'
  },

  /* ========== 四、其他收款方式 ========== */
  pay: {
    wechatQr: 'assets/img/pay-wechat.png',
    alipayQr: 'assets/img/pay-alipay.png'
  },

  /* ========== 五、背景音乐 ========== */
  bgm: [
    { name: '半醉酒馆 · 店内音乐', src: 'assets/audio/bgm1.mp3' }
    /* 想加更多？按上面格式加一行，把 mp3 放进 assets/audio/ */
  ],

  /* ========== 六、订单存储键（不用改） ========== */
  storageKeys: {
    cart: 'jiuguan_cart_v1',
    orders: 'jiuguan_orders_v1'
  }
};
