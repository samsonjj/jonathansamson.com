import React from 'react';
import Markdown from 'markdown-to-jsx'

const blogs = {
  1: 'Hello',
  2: 'FooBar',
};

function blogListItems() {
  let rows = Object.keys(blogs).map((key, index) =>
    <li>
      <a href={`/blog/${key}`}>{blogs[key]}</a>
    </li>
  );
  return rows;
}

export default function Root() {
  // let markdown = await fetch('./test.md').then((r) => r.text());
  let markdown = 'hello';
  return (
    <>
      <div id="sidebar">
        <h1>Articles</h1>
        <div>
          <form id="search-form" role="search">
            <input
              id="q"
              aria-label="Search contacts"
              placeholder="Search"
              type="search"
              name="q"
            />
            <div
              id="search-spinner"
              aria-hidden
              hidden={true}
            />
            <div
              className="sr-only"
              aria-live="polite"
            ></div>
          </form>
          <form method="post">
            <button type="submit">New</button>
          </form>
        </div>
        <nav>
          <ul>
            {blogListItems()}
          </ul>
        </nav>
      </div>
      <div id="detail"></div>
    </>
  );
}