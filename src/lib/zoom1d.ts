
export class Zoom1d {
    static zoom(zoomPoint, leftEdge, rightEdge, zoomPercent): Array<number> {
        let delta;
        let newLeftEdge;
        let newRightEdge;

        let newWidth = (rightEdge - leftEdge) * zoomPercent;

        if (leftEdge > zoomPoint) {   // Zoom object is to the right of x.
            delta = leftEdge - zoomPoint;
            newLeftEdge = zoomPoint + (delta * zoomPercent);
            newRightEdge = newLeftEdge + newWidth;
        } else if (zoomPoint > rightEdge) {    // Zoom object is to the left of x.
            delta = zoomPoint - rightEdge;
            newRightEdge = zoomPoint - (delta * zoomPercent);
            newLeftEdge = newRightEdge - newWidth;
        } else { // Zoom object straddles x.
            let left = zoomPoint - leftEdge;
            let right = rightEdge - zoomPoint;
            let newLeft = left * zoomPercent;
            let newRight = right * zoomPercent;
            newLeftEdge = zoomPoint - newLeft;
            newRightEdge = zoomPoint + newRight;
        }

        return [newLeftEdge, newRightEdge];
    }
}
