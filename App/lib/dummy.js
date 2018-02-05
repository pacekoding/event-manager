const events = [
  {
    title: 'Happy New year',
    images:[
      'http://harboursideplace.com/wp-content/uploads/2014/09/Harbourside-Place-Events-feature-New-Year-New-Downtown.jpg',
      'https://www.eventbriz.com/wp-content/uploads/2017/09/NOWLIVE.jpg',
    ],
    content:`London is one of the best places in the world to be for New Year celebrations. Fact. Never one to miss out on a party, the capital is fully prepared with loads of New Year's Eve parties and events up its sparkly sleeve.`,
    dueDate:20
  },
  {
    title: 'Music Concert',
    images:['https://www.eventbriz.com/wp-content/uploads/2017/09/NOWLIVE.jpg'],
    content:`The Event Music Company provides fine Yorkshire Wedding Music. Trio Vivo, Chris Hilton's Little Big Band, The Groves String Quartet.`,
    dueDate:3
  },
  {
    title: 'TalkShow',
    images:['https://www.newstatesman.com/sites/all/themes/creative-responsive-theme/images/new_statesman_events.jpg'],
    content:'Social Media Marketing Educator Sabrina Kizzie is a digital marketing specialist and blogger who pens the popular SabrinaOnFood.com blog joins Enterprise Radio to discuss best practices for restaurants on instagram.',
    dueDate:7
  },
]

const activities = [
  {
    type:'EXPENSE',
    images:['https://keripikbuahbogor.files.wordpress.com/2013/09/img028.jpg', 'https://3.bp.blogspot.com/-u-0CCREuyvU/UcKp8tKo7eI/AAAAAAAAAWU/gTuYqhNoGKM/s1600/Nota+Barang+2.jpg'],
    total:'1.000.000',
    date: 'January 1, 2018',
    group:'Logistik',
    detail:'Pembelian apa aja',
    isVerified: true,
  },
  {
    images:[],
    type:'INPUT',
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

export {events, activities}
