import Quill from 'quill';

const BlockEmbed = Quill.import('blots/block/embed');

class VideoBlot extends BlockEmbed {
  static create(value: string) {
    const node = super.create() as HTMLIFrameElement;
    const url = this.sanitizeUrl(value);
    node.setAttribute('src', url);
    node.setAttribute('frameborder', '0');
    node.setAttribute('allowfullscreen', 'true');
    node.classList.add('video-embed'); // Добавление класса Tailwind
    node.classList.add(
      'w-full',
      'h-auto',
      'sm:w-3/4',
      'sm:h-64',
      'md:w-2/3',
      'md:h-96'
    ); // Добавление адаптивных классов Tailwind
    return node;
  }

  static value(node: HTMLIFrameElement) {
    return node.getAttribute('src');
  }

  static sanitizeUrl(url: string) {
    // Match different YouTube URL formats
    const videoIdRegex =
      /(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
    const liveRegex = /youtube\.com\/live\/([a-zA-Z0-9_-]+)/;
    let match = url.match(videoIdRegex) || url.match(liveRegex);
    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}`;
    }
    return url;
  }
}

VideoBlot.blotName = 'video';
VideoBlot.tagName = 'iframe';

export function registerVideoBlot() {
  Quill.register(VideoBlot);
}
