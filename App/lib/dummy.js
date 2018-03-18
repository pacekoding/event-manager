const events = [
  {
    title: 'Happy New year',
    pictures:[
      { path: 'http://harboursideplace.com/wp-content/uploads/2014/09/Harbourside-Place-Events-feature-New-Year-New-Downtown.jpg'},
      { path: 'https://www.eventbriz.com/wp-content/uploads/2017/09/NOWLIVE.jpg'},
    ],
    content:`London is one of the best places in the world to be for New Year celebrations. Fact. Never one to miss out on a party, the capital is fully prepared with loads of New Year's Eve parties and events up its sparkly sleeve.`,
    eventDate: new Date("03/25/2018")
  },
  {
    title: 'Music Concert',
    pictures:[{path:'https://www.eventbriz.com/wp-content/uploads/2017/09/NOWLIVE.jpg'}],
    content:`The Event Music Company provides fine Yorkshire Wedding Music. Trio Vivo, Chris Hilton's Little Big Band, The Groves String Quartet.`,
    eventDate: new Date("03/25/2018")
  },
  {
    title: 'TalkShow',
    pictures:[{path:'https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg'}],
    content:'Social Media Marketing Educator Sabrina Kizzie is a digital marketing specialist and blogger who pens the popular SabrinaOnFood.com blog joins Enterprise Radio to discuss best practices for restaurants on instagram.',
    eventDate: new Date("03/25/2018")
  },
]

const activities = [
  {
    type:'EXPENSE',
    images:['https://keripikbuahbogor.files.wordpress.com/2013/09/img028.jpg', 'https://3.bp.blogspot.com/-u-0CCREuyvU/UcKp8tKo7eI/AAAAAAAAAWU/gTuYqhNoGKM/s1600/Nota+Barang+2.jpg'],
    total:'1.000.000',
    date: 'January 1, 2018',
    group:'Logistik',
    detail:'Belanja via Mobile Messaging. Untuk pengguna smartphone, Anda dapat chat dengan Sales Consultant kami melalui aplikasi Whatsapp di nomor 0812 820 1716. Belanja Online via Keranjang Belanja. Cara belanja paling mudah adalah dengan menekan tombol BELI di daftar produk atau di halaman detail produk',
    isVerified: true,
  },
  {
    images:[],
    type:'INCOME',
    total:'14.000.000',
    date: 'January 2, 2018',
    group:'Dana dan Usaha',
    detail:'Sponsor blablabla.com',
    isVerified: false,
  },
  {
    images: [],
    type:'EXPENSE',
    total:'5.000.000',
    date: 'January 2, 2018',
    group:'Acara',
    detail:'Pembelian apa aja',
    isVerified: false,
  },
  {
    images:[],
    type:'EXPENSE',
    total:'3.000.000',
    date: 'January 2, 2018',
    group:'Keamanan',
    detail:'Pembelian apa aja',
    isVerified: true,
  },
]

const teams = [{
  name: 'Finance',
},
{
  name: 'Creative',
},
{
  name: 'Transportation',
},
{
  name: 'Security',
},
{
  name: 'Catering',
},
{
  name: 'Tools',
}]

const people = [{
  name: 'aaaaaaa',
},
{
  name: 'bbbbbbb',
},
{
  name: 'ccccccc',
},
{
  name: 'ddddddd',
},
{
  name: 'eeeeeee',
},
{
  name: 'bbbbbbb',
},
{
  name: 'ccccccc',
},
{
  name: 'ddddddd',
},
{
  name: 'eeeeeee',
},
{
  name: 'fffffff',
}]

const comments = [{
  comment: 'The comments plugin lets people comment on content on your site using their Facebook account.',
},
{
  comment: 'People can choose to share their comment activity with their friends (and friends of their friends) on Facebook as well.',
},
{
  comment: 'In computer programming',
},
{
  comment: `View comments on videos. To view comments on a video, just scroll down the video's page. Replies are threaded to make it easy to follow conversations.`
}
]


const forums = [
  {
    title: 'Meeting on There',
    pictures:[
      { path: 'http://harboursideplace.com/wp-content/uploads/2014/09/Harbourside-Place-Events-feature-New-Year-New-Downtown.jpg'},
      { path: 'https://www.eventbriz.com/wp-content/uploads/2017/09/NOWLIVE.jpg'},
    ],
    content:`Blizzard Entertainment uses cookies and similar technologies on its websites. By continuing your browsing after being presented with the cookie information you consent to such use. `,
    date: new Date()
  },
  {
    title: 'Music Concert',
    pictures:[],
    content:`Blizzard Entertainment uses cookies and similar technologies on its websites. By continuing your browsing after being presented with the cookie information you consent to such use. `,
    date: new Date()
  },
  {
    title: 'TalkShow',
    pictures:[{path:'https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg'}],
    content:'Blizzard Entertainment uses cookies and similar technologies on its websites. By continuing your browsing after being presented with the cookie information you consent to such use. ',
    date: new Date()
  },
]

const leaders = [
  {
    firstName: 'test',
    profilePicture: 'https://3.bp.blogspot.com/-vn5bT6EWO6E/VzB0hEtSrII/AAAAAAAACJ8/5GBuFRo6ImM-BCeD3z9XWejA45Y5ZmLVgCLcB/s1600/Beyonce-no-gravity-mp3-download.jpg',
  },
  {
    firstName: 'test',
    profilePicture: 'https://3.bp.blogspot.com/-vn5bT6EWO6E/VzB0hEtSrII/AAAAAAAACJ8/5GBuFRo6ImM-BCeD3z9XWejA45Y5ZmLVgCLcB/s1600/Beyonce-no-gravity-mp3-download.jpg',
  }
]




export {events, activities, teams, people,comments, forums, leaders}
