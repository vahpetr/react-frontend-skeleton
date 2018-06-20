import * as fontawesome from "@fortawesome/fontawesome";
import * as icon from "@fortawesome/fontawesome-free-solid/faHome";
import * as React from "react";
import {
    AppIconComponent,
    AppIconNameType,
    AppIconPrefixType,
    AppIconSizePropType
} from "src/components/app/icon";

fontawesome.library.add(icon);

export class AppHomeIconComponent extends React.Component {
    public render(): JSX.Element {
        return (
            <div
                className="mx-auto"
                style={{ width: 20, display: "inline-block" }}
            >
                <AppIconComponent
                    prefix={AppIconPrefixType.FAS}
                    icon={AppIconNameType.HOME}
                    size={AppIconSizePropType.X1}
                />
            </div>
        );
    }
}
