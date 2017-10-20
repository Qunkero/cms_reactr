import React from 'react'
import ReactDom from 'react-dom'
import CMS from './CMS/CMS'


ReactDom.render(
    <CMS path="/config.json"/>,
    document.getElementById('container')
);