import { h } from 'preact';
import style from './style.css';

const Body = ({children}) => (
	<div class={style.body}>
		{children}
	</div>
);

export default Body;
