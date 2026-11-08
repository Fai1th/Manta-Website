import React from 'react';

// Articulated vector companion to the supplied mark. UI icons come from Phosphor.
export default function MantaRay() {
  return <div className="ray-scene" aria-hidden="true">
    <svg className="ocean-lines" viewBox="0 0 900 800" fill="none"><g stroke="currentColor">{[210,280,350,420].map(r=><ellipse key={r} cx="480" cy="405" rx={r} ry={r*.68} transform="rotate(-28 480 405)"/>)}</g></svg>
    <svg xmlns="http://www.w3.org/2000/svg" className="ray" viewBox="70 230 1110 720" fill="none">
      <defs><linearGradient id="ray-silver" x1="130" y1="480" x2="1050" y2="900" gradientUnits="userSpaceOnUse"><stop stopColor="#f5fbff"/><stop offset=".4" stopColor="#9bbdd2"/><stop offset=".65" stopColor="#f6fbff"/><stop offset="1" stopColor="#638baa"/></linearGradient><linearGradient id="ray-blue" x1="300" y1="400" x2="800" y2="800" gradientUnits="userSpaceOnUse"><stop stopColor="#aacde3"/><stop offset="1" stopColor="#355977"/></linearGradient></defs>
      <g className="ray-swim">
        <g className="ray-tail" fill="url(#ray-blue)"><path d="M480 600C570 525 606 493 614 419C622 342 674 305 739 285C668 320 635 365 638 414C640 501 688 532 775 600C677 537 635 492 627 446C612 511 549 549 480 600Z"/></g>
        <g className="ray-left"><path fill="url(#ray-blue)" d="M130 482C197 593 350 600 498 568C340 634 253 657 130 482Z"/><path fill="url(#ray-silver)" d="M130 482C181 633 257 691 369 729C412 744 438 773 452 805L480 843C438 768 413 729 365 711C251 669 183 596 130 482Z"/></g>
        <g className="ray-right"><path fill="url(#ray-blue)" d="M1124 482C1057 593 904 600 756 568C914 634 1001 657 1124 482Z"/><path fill="url(#ray-silver)" d="M1124 482C1073 633 997 691 885 729C842 744 816 773 802 805L774 843C816 768 841 729 889 711C1003 669 1071 596 1124 482Z"/></g>
        <g className="ray-body"><path fill="url(#ray-blue)" d="M535 663C606 631 622 611 627 558C632 611 648 631 720 663C655 636 600 639 535 663Z"/><path fill="url(#ray-silver)" d="M526 887C405 846 436 720 561 697C604 689 648 689 692 697C818 720 849 846 728 887C801 825 799 746 690 722C648 713 607 713 564 722C455 746 453 825 526 887Z"/><path fill="#f3f7fb" d="M426 653C456 658 471 674 486 692C455 691 453 671 426 653ZM828 653C798 658 783 674 768 692C799 691 801 671 828 653Z"/><path fill="url(#ray-blue)" d="M480 752C521 768 557 776 599 779C539 779 505 769 480 752ZM477 777C517 791 557 800 600 804C542 804 500 794 477 777ZM774 752C733 768 697 776 655 779C715 779 749 769 774 752ZM777 777C737 791 697 800 654 804C712 804 754 794 777 777Z"/></g>
      </g>
    </svg>
    <span className="ocean-particle particle-one"/><span className="ocean-particle particle-two"/><span className="ocean-particle particle-three"/>
  </div>;
}
