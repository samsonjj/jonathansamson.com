import { render } from '@testing-library/react'
import Markdown from 'markdown-to-jsx'
import React, { useState, useEffect } from 'react';

export default function Root() {
    const [fetchedText, setFetchedText] = useState('');

    useEffect(() => {
        // Simulating a promise fetching text content
        const fetchData = async () => {
        try {
            let markdown = await (await fetch('/test.md')).text();
            setFetchedText(markdown);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };

        fetchData();
    }, []); // The empty dependency array means this effect runs once after initial render

  return (
    <Markdown>{fetchedText}</Markdown>
  );
}