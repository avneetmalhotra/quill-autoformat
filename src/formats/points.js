import Quill from 'quill';

const Embed = Quill.import('blots/embed');

class Points extends Embed {
  static create(value) {
    const node = super.create(value);
    node.setAttribute('title', value);
    node.setAttribute('href', this.BASE_URL + value);
    node.textContent = '+' + value;
    return node;
  }

  static value(domNode) {
    return domNode.textContent.substr(1);
  }
}
Points.blotName = 'points';
Points.className = 'ql-points';
Points.tagName = 'A';
Points.BASE_URL = '/';

export default Points;
