# Sequence Diagram for SPA Creating a New Note

```mermaid
sequenceDiagram
    participant browser
    participant server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/spa
    activate server
    server-->>browser: HTML document 
    deactivate server
    
    Note right of browser: Loading Static Resources 
    browser->>server: GET main.css - spa.js 
    activate server
    server-->>browser: the Css and js files
    deactivate server

    Note right of browser: The browser starts executing the Js code that fetches the JSON from the server

    browser->>server: GET https://studies.cs.helsinki.fi/exampleapp/data.json
    activate server
    server-->>browser: [{ "content": "new content", "date": "2023-1-1" }, ... ]
    deactivate server

    Note right of browser: The browser executes the callback function that renders the notes
    
```
