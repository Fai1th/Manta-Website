import React from 'react';
import {renderToString,renderToStaticMarkup} from 'react-dom/server';
import {SquaresFourIcon,ShieldCheckIcon,LifebuoyIcon,ChartLineUpIcon,LockKeyIcon,UsersThreeIcon,ClockIcon,GearSixIcon,UserCircleIcon,PlugsConnectedIcon} from '@phosphor-icons/react';
import Site from './Site.jsx';
import MantaRay from './MantaRay.jsx';
export const render=()=>renderToString(<Site/>);
export const brandMark=()=>renderToStaticMarkup(<MantaRay/>).match(/<svg[^>]*class="ray"[\s\S]*?<\/svg>/)[0];
export const navIcons=Object.fromEntries(Object.entries({overview:SquaresFourIcon,moderation:ShieldCheckIcon,inbox:LifebuoyIcon,analytics:ChartLineUpIcon,security:LockKeyIcon,roles:UsersThreeIcon,automation:ClockIcon,settings:GearSixIcon,member:UserCircleIcon,integrations:PlugsConnectedIcon}).map(([name,Icon])=>[name,renderToStaticMarkup(<Icon color="#bed0e0" size={20}/>)]));
