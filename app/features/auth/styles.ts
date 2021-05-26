import { StyleSheet } from "react-native";
import { scale, scaleVertical } from "../utils/scale";

export const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: scale(15),
        marginRight: scale(15),
    },
    input: {
        marginTop: scaleVertical(5),
        marginBottom: scaleVertical(5)
    },
    actionButon: {
        paddingTop: scaleVertical(10),
        paddingBottom: scaleVertical(10),
        marginTop: scaleVertical(10),
        marginBottom: scaleVertical(10),
        width: '100%'
    },
    imageRow: {
        flexDirection: 'row',
    },
    imageBox: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        resizeMode: "contain",
        height: 100,
        marginBottom: scaleVertical(50),
        borderRadius: 10
    },
    textCenter: {
        textAlign: "center"
    },
    textRight: {
        textAlign: "right",
        marginEnd: scale(15),
        width: "100%",
        marginTop: scaleVertical(10),
        marginBottom: scaleVertical(10)
    },
    boldText: {
        fontWeight: 'bold'
    },
    buttons: {
        flexDirection: 'row',
        marginBottom: scaleVertical(24),
        justifyContent: 'center',
    },
    button: {
        marginHorizontal: 14,
        marginTop: 30,
        alignSelf: "center",
        padding: 15,
        borderRadius: 32,
        width: 64,
        height: 64,
        alignItems: 'center',
        justifyContent: 'center'
    }, loading: {
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        opacity: 0.5,
        backgroundColor: 'black',
        justifyContent: 'center',
        alignItems: 'center'
    }
});