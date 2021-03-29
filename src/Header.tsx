import React from "react";
import {
    Image, IImageProps, Callout, Persona, ActionButton, PersonaSize, PersonaPresence,
    mergeStyleSets, FontSizes, FontWeights, IPersonaSharedProps, Stack, StackItem, IStackTokens, Separator
} from "@fluentui/react";
import CompanyLogo from "./images/7ElevenLogo.png";
import adalContext from "./adalConfig";

export interface IState {
    isCalloutVisible: boolean;
}

const CompanyLogoProps: Partial<IImageProps> = {
    width: '40px',
    height: '40px'
};

export const StackTokens: Partial<IStackTokens> = { childrenGap: '95%' };

const styles = mergeStyleSets({
    buttonArea: {},
    header: {
        padding: "18px 24px 12px",
    },
    inner: {
        height: "100%",
        padding: "6px 10px 5px",
        float: "right"
    },
    contentbgcolor: {
        backgroundColor: '#F2F2F2',
        border: '1px solid gainsboro',
        height: '90%',
    },
    subtext: [
        FontSizes.small,
        {
            margin: 0,
            fontWeight: FontWeights.semilight,
        },
    ],

});

export const callOutStyles = () => {
    return {
        root: [
            {
                color: '#0078D4',
                fontWeight: FontWeights.bold,
                cursor: "pointer",
                fontSize: "20px",
                backgroundColor: "#00FFFF"
            },
        ],
    }
};

const horizontalGapStackTokens: IStackTokens = {
    childrenGap: 20,
    padding: 0,
};

export class Header extends React.Component<{}, IState> {
    userName = adalContext.AuthContext._user.profile.name;
    Initials = adalContext.AuthContext._user.profile.name.charAt(0);

    constructor(props: any) {
        super(props);
        this.state = { isCalloutVisible: false };
    }

    loggedInPersona: IPersonaSharedProps = {
        imageInitials: this.Initials,
        text: this.userName,
        secondaryText: this.userName,
        tertiaryText: "In a meeting",
        optionalText: "Available at 4:00pm",
    };

    toggleIsCalloutVisible = () => {
        if (!this.state.isCalloutVisible) {
            this.setState({ isCalloutVisible: true });
        }
        else {
            this.setState({ isCalloutVisible: false });
        }
    }

    handleLogOut = () => {
        adalContext.LogOut();
    };

    render() {

        return (
            <div className="ms-Grid">
                <Stack horizontal tokens={StackTokens} className="ms-Grid-row">
                    <StackItem className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                        <Image src={CompanyLogo} {...CompanyLogoProps} alt="LOGO" />
                    </StackItem>

                    <StackItem className="ms-Grid-col ms-sm6 ms-md6 ms-lg6">
                        <Stack
                            horizontal
                            horizontalAlign="end"
                            verticalAlign="center"
                            disableShrink
                            tokens={horizontalGapStackTokens}>
                            <Stack
                                verticalAlign="center"
                                horizontalAlign="center"
                            >
                                <div className={styles.buttonArea}>
                                    <Persona
                                        {...this.loggedInPersona}
                                        size={PersonaSize.size32}
                                        presence={PersonaPresence.online}
                                        hidePersonaDetails={true}
                                        imageAlt=""
                                        onClick={this.toggleIsCalloutVisible}
                                        className={styles.inner}
                                    />
                                    {this.state.isCalloutVisible && (
                                        <Callout
                                            styles={callOutStyles}
                                            ariaLabelledBy=""
                                            ariaDescribedBy=""
                                            role="alertdialog"
                                            gapSpace={0}
                                            target={`.${styles.buttonArea}`}
                                            onDismiss={this.toggleIsCalloutVisible}
                                            setInitialFocus
                                        >
                                            <div style={{ padding: "10px" }}>
                                                <Persona className={styles.inner}  {...this.loggedInPersona}
                                                    size={PersonaSize.size32} hidePersonaDetails={false} />
                                                <hr style={{ border: "1px solid #f3f2f1", marginTop: '3rem' }} />
                                                <ActionButton style={{ fontSize: "14px", marginBottom: '10px', marginTop: '-10px' }} className={styles.inner} onClick={this.handleLogOut}>Sign Out</ActionButton>
                                            </div>
                                        </Callout>
                                    )}
                                </div>
                            </Stack>
                        </Stack>
                    </StackItem>
                </Stack>
            </div>
        )
    }
}

export default Header;