import homePage from '../pages/homePage';
import articlePage from '../pages/articlePage';
import aboutPage from '../pages/aboutPage';
import contactPage from '../pages/contactPage';


export default [
  { path: '', component: homePage },
  { path: 'about', component: aboutPage },
  { path: 'contact', component: contactPage },
  { path: 'article', component: articlePage },
];

