import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";

// Initialize Firebase Admin SDK
function initFirebaseAdmin() {
  const privateKey1 = `-----BEGIN PRIVATE KEY-----
MIIEugIBADANBgkqhkiG9w0BAQEFAASCBKQwggSgAgEAAoIBAQCSw1+lVWnLHP8y
KzlDVJEdLTPl45cTO1W+tpJo+uM69WYK8Xh2Xihh/3j+G9jHyg7Q29Ta+6raOwGP
b9Uwx/rN8YWxUx8AJvzBnqkHhaeB/7ShZhNs1RRsS6f5LgBlRrKTa/+HBGpVezI4
Z2ugEMI/O6Lyffn30T7aS4mmXV4zX9bB0WR4ts5bbo3js401Hco87sBD1eYbNgCr
RjJsWnVn6auEldTIbZfAOTLfx7bU8GWmo5EntaxLRz0s1dAoiea0orHOjeuP126o
ZhSPiD2LaceuurRixQ0mEEPKWZeN+6yTKbBFuJJBjfFTDucnj9EZjSm6S5KciFP6
MTwOEiQXAgMBAAECgf82LspO6oHv0DRZ9VmXw6DjMc0K6whlWXVvXG4t6sDy3AJa
L08pG+jGOCjB9ox7AafmONmk618hz/xadPxNYgqLh5jao4aZ6kEKj9ejFq5lDoWu
gChc/x/TUaUAwrLFJ0eLWjmZ7gdhBGleqyvIlx8ftetEvCn2C8B9+ALZqmO6UZu1
Bgt39rdgFPetVnt5W/cByqunR3LF4agy4YFMlAs7w+RZa2VD2GOkJjLik30fZcpd
nv2czfFzkpjUPEwbYT2ArA3Cyu43Ol7aLQnuyErJSsldNFWAMeS6MKlJbsB7Zp7N
PEy1MPIVkirzQH1EZbYxPlTunBZeTp/nM3RgKcECgYEAyoRcf5CYQAhQd+SabaEw
ekIY2f505qRvjM7o/otKGdh9haL1WP6JnVzR9Mq68rch3s+x+0VFdEIQv8s1ARTg
/XZgCzEWuiTFJnxnsTIYtBqeo0G/I44YcbUtcJzLETRVWXF/x6ojrt7lC43sBtep
kSWaIkARjx0IFzQIfixRVpECgYEAuYWkYHK47tjxQ4PlkytYQqAYnQss+wRT8TZx
3j5SCHMvu3LXNVDgv1sjeV7ucd4mM7i6hGABvluBXd+U3kMRML/00OtSCeCSSpf4
Sy3b96YCMaZf1rvn5KVN6Lxfm/j5vLSZCPyqYoAY3bDmcXMkDMRbdFHBdjj6+l00
ENfQtCcCgYBdJgRlqFxfF3PrsXpWco2Zrk0/94pNi9TDL2h7rBWpTapujUXMaUdi
2g64SYcznIg3s9BpgrMvhjOuBAmdNb1G1+vVOf76H2+PBCmtlx1Fufi9nsAL2o/j
vTHpWjUM9MVNHqdnbxp6lItFhUHK4+dam7EJj+6DpRbTlVtSrY+8AQKBgBo0Z1B8
Q+Tw3btEoSPVhoT6qh9cmcDnDphOsWzL7rhk1MQsZ3uPbf95dxxIrXOGBm1d1XKn
QPfLYw2IbDWs0XvKUWFFK/RbNS62Iosz8hMb7slmj7j8F7gzJTsPiI22cEgYVllv
nv2EzH5b42D4+4mWHrjiZ2o0iDbe/WC3qzIXAoGAMbU7qdQf9DLnZS/gsUW+eEJ1
Ix9YZxupxS2aOYM+5ujYORk7mm/HWw4zI8vga9mDXs7BpZzQgPe10kGAvx44U4ks
sPPkMrGdTZaQ2X3nUBjDmIRk0wXuE9jP46Ea0irY2GSXEIOV0iCsNRaXTT8YILDF
0xE0dynqf6g4ewR0M6w=
-----END PRIVATE KEY-----`;
  const apps = getApps();

  if (!apps.length) {
    initializeApp({
      credential: cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        // Replace newlines in the private key
        // privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
        privateKey: privateKey1,
      }),
    });
  }

  return {
    auth: getAuth(),
    db: getFirestore(),
  };
}

export const { auth, db } = initFirebaseAdmin();
