import React from "react";
import { Body } from "./Styles";
import "./Styles.css";

function LoadingFinances() {
  return (
    <Body>
      <svg
        class="sp"
        viewBox="0 0 128 128"
        width="128px"
        height="128px"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="grad1" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5700D5" />
            <stop offset="40%" stop-color="#5762D5" />
            <stop offset="100%" stop-color="#5700D5" />
          </linearGradient>
          <linearGradient id="grad2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#5700D5" />
            <stop offset="40%" stop-color="#5762D5" />
            <stop offset="100%" stop-color="#5700D5" />
          </linearGradient>
          <mask id="mask1">
            <rect x="0" y="0" width="128" height="128" fill="url(#grad1)" />
          </mask>
          <mask id="mask2">
            <rect x="0" y="0" width="128" height="128" fill="url(#grad2)" />
          </mask>
        </defs>
        <g fill="none" stroke-linecap="round" stroke-width="16">
          <circle class="sp__ring" r="56" cx="64" cy="64" stroke="#ddd" />
          <g stroke="hsl(265,100%,42%)">
            <path
              class="sp__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              stroke="hsl(265,100%,42%)"
              stroke-dasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g class="sp__worm2" transform="translate(-42,0)">
                <path
                  class="sp__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  stroke-dasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
          <g mask="url(#mask1)">
            <path
              class="sp__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              stroke-dasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g class="sp__worm2" transform="translate(-42,0)">
                <path
                  class="sp__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  stroke-dasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
          <g stroke="hsl(265,100%,42%)" mask="url(#mask2)">
            <path
              class="sp__worm1"
              d="M120,64c0,30.928-25.072,56-56,56S8,94.928,8,64"
              stroke-dasharray="43.98 307.87"
            />
            <g transform="translate(42,42)">
              <g class="sp__worm2" transform="translate(-42,0)">
                <path
                  class="sp__worm2-1"
                  d="M8,22c0-7.732,6.268-14,14-14s14,6.268,14,14"
                  stroke-dasharray="43.98 175.92"
                />
              </g>
            </g>
          </g>
        </g>
      </svg>
    </Body>
  );
}

export default LoadingFinances;
