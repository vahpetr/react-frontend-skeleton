import * as fontawesome from "@fortawesome/fontawesome";
import * as icon from "@fortawesome/fontawesome-free-solid/faSpinner";
import * as React from "react";
import {
    AppIconComponent,
    AppIconNameType,
    AppIconPrefixType,
    AppIconRotateType,
    AppIconSizePropType
} from "src/components/app/icon";

fontawesome.library.add(icon);

export class AppSpinnerIconComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <div className="mx-auto fa-spinner" style={{ width: 56 }}>
                <AppIconComponent
                    prefix={AppIconPrefixType.FAS}
                    icon={AppIconNameType.SPINNER}
                    rotate={AppIconRotateType.SPIN}
                    size={AppIconSizePropType.X4}
                />
            </div>
        );
    }
}
