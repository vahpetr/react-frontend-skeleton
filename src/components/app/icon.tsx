import * as React from "react";

export interface AppIconProps {
    prefix: AppIconPrefixType;
    icon: AppIconNameType;
    inverse?: false;
    size?: AppIconSizePropType;
    fixedWidth?: false;
    rotate?: AppIconRotateType;
    pull?: AppIconPullPropType;
}

// https://fontawesome.com/how-to-use/svg-with-js
// https://github.com/DaemonAlchemist/react-font-awesome/blob/master/src/index.jsx
export class AppIconComponent extends React.Component<AppIconProps> {
    public render(): JSX.Element {
        const {
            prefix,
            inverse,
            icon,
            size,
            fixedWidth,
            rotate,
            pull
        } = this.props;
        const classNames: string[] = [];

        if (prefix) {
            classNames.push(`${prefix}`);
        }
        if (inverse) {
            classNames.push(`fa-inverse`);
        }
        if (icon) {
            classNames.push(`fa-${icon}`);
        }
        if (size) {
            classNames.push(`fa-${size}`);
        }
        if (fixedWidth) {
            classNames.push(`fa-fw`);
        }
        if (rotate) {
            classNames.push(`fa-${rotate}`);
        }
        if (pull) {
            classNames.push(`fa-pull-${pull}`);
        }

        return <i className={classNames.join(" ")} />;
    }
}

export enum AppIconRotateType {
    SPIN = "spin",
    PULSE = "pulse"
}

export enum AppIconPrefixType {
    FAS = "fas",
    FAB = "fab",
    FAR = "far",
    FAL = "fal"
}

export enum AppIconSizePropType {
    XS = "xs",
    LG = "lg",
    SM = "sm",
    X1 = "1x",
    X2 = "2x",
    X3 = "3x",
    X4 = "4x",
    X5 = "5x",
    X6 = "6x",
    X7 = "7x",
    X8 = "8x",
    X9 = "9x",
    X10 = "10x"
}

export enum AppIconPullPropType {
    LEFT = "left",
    RIGHT = "right"
}

export enum AppIconNameType {
    SPINNER = "spinner",
    HOME = "home"
}
