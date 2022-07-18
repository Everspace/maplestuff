import { Box } from "@mui/material"
import { allClassNames } from "class/types"
import { NextPage } from "next"
import Layout from "page/Layout"
import { ClassCard } from "page/linkskills/ClassCard"

const LinkSkills: NextPage = () => {
  return (
    <Layout>
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gridAutoFlow: "row",
          gap: 1,
        }}
      >
        {allClassNames.map((name) => (
          <Box sx={{ gridColumn: "span 1", gridRow: "span 1" }} key={name}>
            <ClassCard className={name} />
          </Box>
        ))}
      </Box>
    </Layout>
  )
}

export default LinkSkills
