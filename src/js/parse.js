/* Heading */
function parseHeadings(text) {
  const headingRegex = /^(#+)\s*(.+)/gm;

  return text.replace(headingRegex, function (match, hashes, content) {
    const level = Math.min(hashes.length, 6);

    return `<h${level}>${content}</h${level}>`;
  });
}

/* Bold */

function parseBold(text) {
  const boldRegex = /\*\*(.+?)\*\*/g;
  return text.replace(boldRegex, function (fullMatch, content) {
    return `<strong>${content}</strong>`;
  });
}

/* italic */

function parseItalic(text) {
  const boldRegex = /(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g;
  return text.replace(boldRegex, function (fullMatch, content) {
    return `<em>${content}</em>`;
  });
}

/* li */

function parseLi(text) {
  text = text.replace(/^-(?!-)\s*(.+)/gm, function (fullMatch, content) {
    return `<li data-list="ul">${content}</li>`;
  });

  text = text.replace(/(<li data-list="ul">[\s\S]+?<\/li>\s*)+/g, function (match) {
    const hasTrailingNewline = /\n\s*$/.test(match);
    const listItems = match.trimEnd();
    return hasTrailingNewline ? `<ul>${listItems}</ul>\n` : `<ul>${listItems}</ul>`;
  });

  text = text.replace(/ data-list="ul"/g, "");

  return text;
}

/* ol */

function parseOL(text) {
  text = text.replace(/^\d+\.\s*(.+)/gm, function (fullMatch, content) {
    return `<li data-list="ol">${content}</li>`;
  });

  text = text.replace(/(<li data-list="ol">[\s\S]+?<\/li>\s*)+/g, function (match) {
    const hasTrailingNewline = /\n\s*$/.test(match);
    const listItems = match.trimEnd();
    return hasTrailingNewline ? `<ol>${listItems}</ol>\n` : `<ol>${listItems}</ol>`;
  });

  text = text.replace(/ data-list="ol"/g, "");

  return text;
}

/* code */

function escapeHtml(value) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function extractCodeSegments(text) {
  const tokens = [];

  const tripleParsed = text.replace(/```([\s\S]+?)```/g, function (match, content) {
    const escaped = escapeHtml(content);
    const html = `<pre><code>${escaped}</code></pre>`;
    const token = `@@CODE_TOKEN_${tokens.length}@@`;
    tokens.push(html);
    return token;
  });

  const parsed = tripleParsed.replace(/`([\s\S]+?)`/g, function (match, content) {
    const escaped = escapeHtml(content);
    const html = `<code>${escaped}</code>`;
    const token = `@@CODE_TOKEN_${tokens.length}@@`;
    tokens.push(html);
    return token;
  });

  return { parsed, tokens };
}

function restoreCodeSegments(text, tokens) {
  return text.replace(/@@CODE_TOKEN_(\d+)@@/g, function (match, index) {
    return tokens[Number(index)] ?? match;
  });
}

/* blockquote */
function parseBlockquote(text) {
  return text.replace(/^>\s*(.+)/gm, function (match, content) {
    return `<blockquote>${content}</blockquote>`;
  });
}

/* links */

function parseLink(text) {
  return text.replace(/\[(.+?)\]\((.+?)\)/g, function (fullMatch, content1, url) {
    return `<a href="${url}" target="_blank">${content1}</a>`;
  });
}

/* image */

function parseImage(text) {
  return text.replace(/!\[(.+?)\]\((.+?)\)/g, function (fullMatch, content1, url) {
    return `<img src="${url}" alt="${content1}">`;
  });
}

/* hr */

function parseHorizontalRule(text) {
  return text.replace(/^-{3,}$/gm, function (match) {
    return `<hr>`;
  });
}

/* p */

function parseParagraph(text) {
  /* p */

  return text
    .split("\n")
    .map(function (line) {
      if (line === "") return line;
      if (/^\s*@@CODE_TOKEN_\d+@@\s*$/.test(line)) return line;
      if (line.startsWith("<")) return line;
      return `<p>${line}</p>`;
    })
    .join("\n");
}

export function parseMarkdown(text) {
  const { parsed, tokens } = extractCodeSegments(text);

  let result = escapeHtml(parsed);
  result = parseHeadings(result);
  result = parseBold(result);
  result = parseItalic(result);
  result = parseLi(result);
  result = parseOL(result);
  result = parseBlockquote(result);
  result = parseImage(result);
  result = parseLink(result);
  result = parseHorizontalRule(result);
  result = parseParagraph(result);
  result = restoreCodeSegments(result, tokens);
  return result;
}
