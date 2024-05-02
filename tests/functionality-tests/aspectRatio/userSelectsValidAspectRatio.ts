import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getCustomProcessedFolderPath} from "../_helper/getCustomProcessedFolderPath"
import {assertAspectRatio} from "../_helper/assertAspectRatio"
import sizeOf from "image-size"
import assert from "assert"

describe.each([
    3 / 2,
    1,
    16 / 9,
])
('aspect ratio', (aspectRatio: number) => {
    test(`the final photo should have an aspect ratio of ${aspectRatio}`, async () => {
        // create image
        const jimpClient = new JimpClient()
        jimpClient.setAspectRatio(aspectRatio)
        await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `aspect_ratio_${aspectRatio}.jpg`)

        // fetch dimensions
        const dimensions = sizeOf(`${getCustomProcessedFolderPath()}/aspect_ratio_${aspectRatio}.jpg`)
        const width = dimensions.width
        const height = dimensions.height

        // check aspect ratio
        if (width && height) {
            assertAspectRatio(width, height, aspectRatio)
        } else {
            assert(false)
        }
    })
})
