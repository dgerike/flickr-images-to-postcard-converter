import {JimpClient} from "../../../lib/jimp/JimpClient"
import {getCustomProcessedFolderPath} from "../_helper/getCustomProcessedFolderPath"
import {assertAspectRatio} from "../_helper/assertAspectRatio"
import sizeOf from "image-size"
import assert from "assert"

test('selecting no aspect ratio should result in using the default value', async () => {
    // create image
    const jimpClient = new JimpClient()
    await jimpClient.saveProcessedImage(getCustomProcessedFolderPath(), `no_aspect_ratio_selected.jpg`)

    // fetch dimensions
    const dimensions = sizeOf(`${getCustomProcessedFolderPath()}/no_aspect_ratio_selected.jpg`)
    const width = dimensions.width
    const height = dimensions.height

    // check aspect ratio
    if (width && height) {
        assertAspectRatio(width, height, 1)
    } else {
        assert(false)
    }
})
